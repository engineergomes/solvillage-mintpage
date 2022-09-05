import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript, Box } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Box
      // backgroundImage="url('/fundo.jpg')"
      // backgroundSize={"cover"}
      // backgroundRepeat={"no-repeat"}
      >
        <Html>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Reenie Beanie"
              rel="stylesheet"
            ></link>
            <link
              href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700&display=swap"
              rel="stylesheet"
            ></link>
            <link
              href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
              rel="stylesheet"
            ></link>
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Goldman:wght@400&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Press+Start+2P:wght@400&display=swap"
              rel="stylesheet"
            />
          </Head>

          <body>
            {/* Make Color mode to persists when you refresh the page. */}
            {/* <ColorModeScript /> */}
            <Main />
            <NextScript />
          </body>
        </Html>
      </Box>
    );
  }
}
