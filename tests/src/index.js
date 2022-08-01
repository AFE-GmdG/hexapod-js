const process = require("process");
const pigpio = require("pigpio");
const Gpio = pigpio.Gpio;

pigpio.initialize();

console.log(`Hardware Revision: ${pigpio.hardwareRevision().toString(16)}`);

let iv;
let led;

process.on("SIGINT", () => {
  console.log("Cleaning up...");
  if (led) {
    led.digitalWrite(0);
  }
  pigpio.terminate();
  clearInterval(iv);
  process.exit(0);
});

led = new Gpio(17, { mode: Gpio.OUTPUT });
led.trigger

iv = setInterval(() => {
  led.digitalWrite(led.digitalRead() ^ 1);
}, 3000);
