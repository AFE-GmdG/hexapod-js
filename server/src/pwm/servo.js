import { delay, mapValue, hexPad8Bit } from "./common.js";
import PCA9685, { ADDR_0x40, ADDR_0x41 } from "./pca9685.js";

class Servo {
  /** @type {boolean} */
  #debug;

  /** @type {PCA9685} */
  #pwm40;

  /** @type {PCA9685} */
  #pwm41;

  /** @type {Promise<void>} */
  #ctorPromise;

  /**
   * gets the ctor promise.
   * @returns {Promise<void>} A promise that resolves when the servos are ready.
   */
   get ctorPromise() {
    return this.#ctorPromise;
  }

  /**
   * @param {boolean} debug Set to enable debug messages. Default is false.
   */
  constructor(debug = false) {
    this.#debug = debug;
    this.#ctorPromise = new Promise((ctorResolve) => {
      this.#pwm40 = new PCA9685(ADDR_0x40, debug);
      this.#pwm41 = new PCA9685(ADDR_0x41, debug);
    return Promise.all([
      this.#pwm40.ctorPromise,
      this.#pwm41.ctorPromise,
      ]).then(() => {
        return this.#pwm40.setPwmFrequency(50);
      }).then(() => {
        return delay(10);
      }).then(() => {
        return this.#pwm41.setPwmFrequency(50);
      }).then(() => {
        return delay(10);
      }).then(ctorResolve);
    });
  }

  /**
   * Sets the servo position.
   * @param {number} servo The servo to set. Integer range from 0 to 31.
   * @param {number} angle The angle to set the servo to. Float range from 0 to 180.
   * @returns {Promise<void>}
   */
  async setServoAngle(servo, angle) {
    await this.#ctorPromise;

    if (!Number.isInteger(servo) || servo < 0 || servo > 31) {
      throw new Error(`Servo - Invalid servo number: ${hexPad8Bit(servo)}`);
    }
    if (!Number.isFinite(angle)) {
      throw new Error(`Servo - Invalid angle: ${angle}`);
    }
    angle = Math.max(0, Math.min(180, angle));
    // 0-180 map to 500-2500us, then map to duty 0-4095
    const duty = Math.floor(mapValue(mapValue(angle, 0, 180, 500, 2500), 0, 20000, 0, 4095, true));
    if (servo < 16) {
      await this.#pwm41.setPwm(servo, 0, duty);
    } else {
      await this.#pwm40.setPwm(servo - 16, 0, duty);
    }
  }

  /**
   * Relax the specified servo. If no servo is specified, it relaxes all servos.
   * @param {number} servo The delay between each servo.
   * @returns {Promise<void>}
   */
  async relax(servo = undefined) {
    await this.#ctorPromise;

    if (servo === undefined) {
      for (let i = 0; i < 8; ++i) {
        await this.#pwm41.setPwm(i, 4096, 4096);
        await this.#pwm41.setPwm(i + 8, 4096, 4096);
        await this.#pwm40.setPwm(i, 4096, 4096);
        await this.#pwm40.setPwm(i + 8, 4096, 4096);
      }
      return;
    }

    if (!Number.isInteger(servo) || servo < 0 || servo > 31) {
      throw new Error(`Servo - Invalid servo number: ${hexPad8Bit(servo)}`);
    }
    if (servo < 16) {
      await this.#pwm41.setPwm(servo, 4096, 4096);
    } else {
      await this.#pwm40.setPwm(servo - 16, 4096, 4096);
    }
  }

  /**
   * Set the Servo installation positions.
   * @returns {Promise<void>}
   */
  async setInstallationPositions() {
    await this.#ctorPromise;

    await this.setServoAngle(0, 90);
    await this.setServoAngle(1, 90);
    await this.setServoAngle(2, 90);
    await this.setServoAngle(3, 90);
    await this.setServoAngle(4, 90);
    await this.setServoAngle(5, 90);
    await this.setServoAngle(6, 90);
    await this.setServoAngle(7, 90);
    await this.setServoAngle(8, 90);
    await this.setServoAngle(9, 90);
    await this.setServoAngle(10, 0);  // elbow center right
    await this.setServoAngle(11, 90);
    await this.setServoAngle(12, 90);
    await this.setServoAngle(13, 0);  // elbow front right
    await this.setServoAngle(14, 90);
    await this.setServoAngle(15, 90);
    await this.setServoAngle(16, 90);
    await this.setServoAngle(17, 90);
    await this.setServoAngle(18, 180); // elbow front left
    await this.setServoAngle(19, 90);
    await this.setServoAngle(20, 90);
    await this.setServoAngle(21, 180); // elbow center left
    await this.setServoAngle(22, 90);
    await this.setServoAngle(23, 90);
    await this.setServoAngle(24, 90);
    await this.setServoAngle(25, 90);
    await this.setServoAngle(26, 90);
    await this.setServoAngle(27, 180); // elbow back left
    await this.setServoAngle(28, 90);
    await this.setServoAngle(29, 90);
    await this.setServoAngle(30, 90);
    await this.setServoAngle(31, 0);   // elbow back right

    await delay(1000);
    await this.relax();
  }

  async stop() {
    await this.#ctorPromise;

    if (this.#debug) {
      console.log("Servo - Stopping...");
    }

    await this.#pwm40.stop();
    await this.#pwm41.stop();

    if (this.#debug) {
      console.log("Servo - Stopped");
    }
  }
}

export default Servo;
