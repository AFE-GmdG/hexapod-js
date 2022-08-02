/**
 * Express / Socket.IO Test Server: server module
 * @module tests/express/server
 */

import process from "node:process";

import App from "./app.js";

function main() {
  const app = new App();

  app.start().then(
    () => {
      console.log(`PID: ${process.pid} (use CTRL+C or type "kill -2 ${process.pid}" on a shell to stop)`);
    },
    (error) => {
      if (!error) {
        console.error("Unknown error: App isn't started");
      } else {
        (
          error instanceof Error
          || (typeof error === "object" && "message" in error && typeof error.message === "string")
        ) ? console.error(error.message) : console.error(`${error}`);
      }
      process.exit(1);
    }
  );

  let callAmount = 0;
  process.on("SIGINT", () => {
    console.log();
    console.log("SIGINT received. Exiting...");
    if (callAmount === 0) {
      app.stop().then(() => {
        process.exit(0);
      });
    }

    callAmount++;
  });

  process.on("SIGTERM", () => {
    console.log();
    console.log("SIGTERM received. Exiting...");
    process.exit(0);
  });
}

export default main;
