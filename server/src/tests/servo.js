/**
 * Servo test module
 * @module tests/servo
 */

import { delay } from "../common.js";
import Servo from "../pwm/servo.js";

async function test() {
  const servo = new Servo(true);

  try {
    await servo.ctorPromise;
    await delay(1000);
  } finally {
    await servo.stop();
  }
}

export default test;
