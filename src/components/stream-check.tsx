"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

export default function StreamCheck() {
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastAudioLevelRef = useRef(0);

  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;
    let animationFrameId: number | null = null;

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        const updateAudioLevel = () => {
          if (analyser && dataArray) {
            analyser.getByteFrequencyData(dataArray);
            const average =
              dataArray.reduce((acc, value) => acc + value, 0) /
              dataArray.length;

            const logLevel = Math.log(average + 1) / Math.log(256);
            const newLevel = Math.min(logLevel * 1.5, 1);

            const decayFactor = 0.05;
            const decayedLevel = Math.max(
              lastAudioLevelRef.current - decayFactor,
              newLevel
            );

            lastAudioLevelRef.current = decayedLevel;
            setAudioLevel(decayedLevel);
          }
          animationFrameId = requestAnimationFrame(updateAudioLevel);
        };
        updateAudioLevel();
      } catch (error) {
        console.error("Error accessing webcam or microphone:", error);
        setError("There was an issue connecting to the webcam.");
      }
    };

    if (isWebcamOn) {
      startWebcam();
    } else {
      setAudioLevel(0);
      lastAudioLevelRef.current = 0;
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (audioContext) {
        audioContext.close();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isWebcamOn]);

  const toggleWebcam = () => {
    setIsWebcamOn(!isWebcamOn);
  };

  const closeErrorModal = () => {
    setError(null);
  };

  const getGradientStyle = (level: number) => {
    let color: string;
    if (level <= 0.75) {
      const r = Math.round(144 + (50 - 144) * (level / 0.75));
      const g = Math.round(238 + (205 - 238) * (level / 0.75));
      const b = Math.round(144 + (50 - 144) * (level / 0.75));
      color = `rgb(${r}, ${g}, ${b})`;
    } else if (level <= 0.85) {
      const factor = (level - 0.75) / 0.1;
      const r = Math.round(50 + (255 - 50) * factor);
      const g = Math.round(205 + (215 - 205) * factor);
      const b = Math.round(50 * (1 - factor));
      color = `rgb(${r}, ${g}, ${b})`;
    } else {
      const factor = (level - 0.85) / 0.15;
      const r = 255;
      const g = Math.round(215 * (1 - factor));
      const b = 0;
      color = `rgb(${r}, ${g}, ${b})`;
    }

    return {
      width: `${level * 100}%`,
      backgroundColor: color,
      transition: "all 100ms ease-out",
    };
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      suppressHydrationWarning // figure out why this is happening for this component
    >
      <div
        className={`aspect-video ${
          isWebcamOn ? "" : "h-64 md:h-80 lg:h-96"
        } bg-gray-200 relative`}
      >
        {isWebcamOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Webcam is off
          </div>
        )}
      </div>
      <div className="p-6">
        {isWebcamOn && (
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">
              Audio Level
            </span>
            <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={getGradientStyle(audioLevel)}
              ></div>
            </div>
          </div>
        )}
        <Button onClick={toggleWebcam} className="w-full">
          {isWebcamOn ? "Turn Off Webcam" : "Turn On Webcam"}
        </Button>
      </div>
      <Dialog open={Boolean(error)} onClose={closeErrorModal}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
          <Button onClick={closeErrorModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
