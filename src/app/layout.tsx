import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  authors: [{ name: "Justin Kahrs", url: "https://www.justinkahrs.com" }],
  title: "Check 1 2 Live - Webcam and Microphone Test for Streamers",
  description:
    "Test your webcam and microphone setup effortlessly before going live. Ensure your stream looks and sounds great with our real-time testing tool.",
  keywords:
    "webcam test, microphone test, streaming setup, live stream tools, stream test, audio test, video test, mic check, webcam checker, streaming platform setup",
  robots: "index, follow",
  openGraph: {
    title: "Check 1 2 Live - Webcam and Microphone Test for Streamers",
    description:
      "Streamers, test your webcam and microphone with ease. Ensure your live stream setup is flawless before hitting 'Go Live.'",
    url: "https://check12.live",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@justinkahrs",
    title: "Check 1 2 Live - Webcam and Microphone Test for Streamers",
    description:
      "Easily test your streaming setup to ensure a flawless live experience.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6315501416644956"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
