import process from "node:process";
import pigpio, { Gpio } from "pigpio";

import App from "./app";

pigpio.initialize();

console.log(`Hardware Revision: ${pigpio.hardwareRevision().toString(16)}`);

let iv: NodeJS.Timer;
let led: Gpio;

let cleanupCalls = 0;
const cleanup = (signal: NodeJS.Signals) => {
  console.log(`\n${signal} received.`);
  if (cleanupCalls === 0) {
    ++cleanupCalls;
    if (led) {
      led.digitalWrite(0);
    }
    pigpio.terminate();
    clearInterval(iv);
    process.exit(0);
  }
  console.log(`${signal} received more than once: (${cleanupCalls})\nExiting...`);
};

process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);

console.log(App);

led = new Gpio(17, { mode: Gpio.OUTPUT });
led.trigger

iv = setInterval(() => {
  led.digitalWrite(led.digitalRead() ^ 1);
}, 1000);
