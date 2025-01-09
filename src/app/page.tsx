import { Grid } from "@mui/material";
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
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 4, sm: 20 },
        pb: { xs: 12, sm: 20 },
        pt: { xs: 4, sm: 8 },
        gap: { xs: 4, sm: 8 },
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      <Grid item xs={12} sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          spacing={4}
          alignItems={{ xs: "center", sm: "flex-start" }}
          sx={{ margin: "inherit" }}
        >
          {/* Header Items */}
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={9}
              lg={4}
              container
              direction="column"
              justifyContent="center"
            >
              <div
                className={`${satoshi.className} typewriter uppercase`}
                style={{
                  fontSize: "52px",
                  fontWeight: "bold",
                }}
              >
                Check... 1, 2
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              container
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Image
                className="inline"
                src={MicIcon}
                alt="My Icon"
                width={40}
                height={40}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <StreamCheck />
            </Grid>
            <Grid item xs={12} md={4}>
              <ChatComponentComponent />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom spacer */}
      <Grid item xs={12} sx={{ height: 20 }} />
    </Grid>
  );
}
