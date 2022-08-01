/**
 * Server module
 * @module server
 */

import process from "process";

import { delay } from "./pwm/common.js";

import App from "./app.js";
import LedController from "./controllers/led.js";

import Servo from "./pwm/servo.js";

const servo = new Servo(false);

// servo.setServoAngle(13, 0).then(() => {
//   return delay(1000);
// }).then(() => {
//   return servo.setServoAngle(13, 160);
// }).then(() => {
//   return delay(1000);
// }).then(() => {
//   servo.relax(13);
// }).then(() => {
//   return delay(1000);
// }).then(() => {
//   servo.setInstallationPositions();
// });

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
