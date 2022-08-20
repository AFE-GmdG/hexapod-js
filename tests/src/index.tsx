import React from "react";

import { createRoot } from "./fiber";

import Screen from "./tui/screen";

import App from "./app";

const screen = new Screen();
const root = createRoot(screen);
root.render(<App name="Andreas" />, () => {
  console.log("render complete");
});

// const delay = (ms: number) => {
//   return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
// };

// process.on("SIGINT", () => {
//   console.log();
//   console.log("SIGINT received. Exiting...");
//   process.exit(0);
// });

// const loop = async () => {
//   while (true) {
//     await delay(100);
//   }
// }

// loop();
