import process from 'process';

import App from "./app";
import LedController from "./controllers/led";

import Servo from "./pwm/servo";

const servo = new Servo();

const app = new App([
  new LedController(),
], 3000);

app.listen();

let callAmount = 0;
process.on("SIGINT", () => {
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
  console.log("SIGTERM received. Exiting...");
  process.exit(0);
});
