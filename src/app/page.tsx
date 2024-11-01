import { Grid2 as Grid } from "@mui/material";
import localFont from "next/font/local";
import Image from "next/image";

import StreamCheck from "@/components/stream-check";
import { ChatComponentComponent } from "@/components/chat-component";
import MicIcon from "@/components/svgs/old-school-mic.svg";
import "./index.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Regular.woff",
  display: "swap",
});

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Grid container spacing={2}>
          <Grid size={9} container direction="column" justifyContent="center">
            <h1
              className={`${satoshi.className} typewriter uppercase`}
              style={{
                fontSize: "52px",
                fontWeight: "bold",
              }}
            >
              Check... 1, 2
            </h1>
          </Grid>
          <Grid size={3} container alignItems="center" justifyContent="center">
            <Image
              className="inline"
              src={MicIcon}
              alt="My Icon"
              width={80}
              height={80}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={8}>
            <StreamCheck />
          </Grid>
          <Grid size={4}>
            <ChatComponentComponent />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
