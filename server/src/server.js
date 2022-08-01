/**
 * Server module
 * @module server
 */

import process from "process";
import pigpio from "pigpio";

import App from "./app.js";
import LedController from "./controllers/led.js";

import Servo from "./pwm/servo.js";

pigpio.initialize();

const servo = new Servo(false);

const app = new App([
  new LedController(),
], 3000);

app.listen().then(() => {
  console.log(`PID: ${process.pid} (use CTRL+C or type "kill -2 ${process.pid}" on a shell to stop)`);
});

let callAmount = 0;
process.on("SIGINT", () => {
  console.log();
  console.log("SIGINT received. Exiting...");
  if (callAmount === 0) {
    app.stop().then(() => {
      return servo.stop();
    }).then(() => {
      pigpio.terminate();
      process.exit(0);
    });
  }

  callAmount++;
});

process.on("SIGTERM", () => {
  console.log();
  console.log("SIGTERM received. Exiting...");
  pigpio.terminate();
  process.exit(0);
});
