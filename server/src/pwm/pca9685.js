import i2c from "i2c-bus";

import { delay, hexPad8Bit, hexPad16Bit } from "../common.js";

export const ADDR_0x40 = 0x40;
export const ADDR_0x41 = 0x41;

const REG_MODE1 = 0x00;
const REG_LED0_ON_L = 0x06;
const REG_LED0_ON_H = 0x07;
const REG_LED0_OFF_L = 0x08;
const REG_LED0_OFF_H = 0x09;
const REG_PRESCALE = 0xFE;

/**
 * ``` txt
 * =========================================
 * Raspi PCA9685 16-Channel PWM Servo Driver
 * =========================================
 * ```
 */
class PCA9685 {
  /** @type {number} */
  #address;

  /** @type {boolean} */
  #debug;

  /** @type {i2c.PromisifiedBus} */
  #bus;

  /** @type {Promise<void>} */
  #ctorPromise;

  /** @type {Promise<void>} */
  #syncPromise;

  /**
   * gets the ctor promise.
   * @returns {Promise<void>} A promise that resolves when the PCA9685 is initialized.
   */
  get ctorPromise() {
    return this.#ctorPromise;
  }

  /**
   * @param {ADDR_0x40 | ADDR_0x41} address A address for the PCA9685.
   * @param {boolean} debug Set to enable debug messages. Default is false.
   */
  constructor(address, debug = false) {
    this.#address = address;
    this.#debug = debug;
    this.#ctorPromise = new Promise((ctorResolve) => {
      this.#syncPromise = new Promise((syncResolve) => {
        i2c.openPromisified(1).then((bus) => {
          this.#bus = bus;
          syncResolve();
        });
      }).then(() => {
        this.write(REG_MODE1, 0x00);
      }).then(ctorResolve);
    });
  }

  /**
   * Returns a formatted message.
   * @param {string} message The message to format.
   * @returns {string} A formatted message.
   */
  #getFormattedMessage(message) {
    return `PCA9685 ${hexPad8Bit(this.#address)} - ${message}`;
  }

  /**
   * If debug is enabled, log out the specified message.
   * @param {any} message The message to log out.
   */
  #logDebugMessage(message) {
    if (this.#debug) {
      console.log(this.#getFormattedMessage(message));
    }
  };

  /**
   * Log out the warning message.
   * @param {any} message The warning message to log out.
   */
  #warn(message) {
    console.warn(this.#getFormattedMessage(message));
  }

  /**
   * Writes an 8-bit value to the specified register.
   * @param {number} register The register to write to.
   * @param {number} value The value to write.
   * @returns {Promise<void>} A promise that resolves when the write is done.
   */
  async write(register, value) {
    await this.#syncPromise;
    this.#logDebugMessage(`Writing to register: ${hexPad8Bit(register)} = ${hexPad8Bit(value)}`);
    this.#syncPromise = this.#bus.writeByte(this.#address, register, value);
    return;
  }

  /**
   * Reads an 8-bit value from the specified register.
   * @param {number} register The register to read from.
   * @returns {Promise<number>} A promise that resolves with the read value.
   */
  async read(register) {
    await this.#syncPromise;

    let value = 0;
    this.#syncPromise = this.#bus.readByte(this.#address, register).then((v) => {
      value = v;
    });

    await this.#syncPromise;
    return value;
  }

  /**
   * Sets the PWM frequency.
   * @param {number} frequency The frequency to set.
   * @returns {Promise<void>} A promise that resolves when the frequency is set.
   */
  async setPwmFrequency(frequency) {
    await this.#ctorPromise;
    this.#logDebugMessage(`Setting frequency to ${frequency}`);
    // +0.5? See S:\Work\Freenove_Big_Hexapod_Robot_Kit_for_Raspberry_Pi\Code\Server\PCA9685.py:49
    let prescale = Math.floor(25000000 / (4096 * frequency)) - 1;
    if (prescale < 0x00 || prescale > 0xFF) {
      if (this.#debug) {
        this.#warn(`Invalid frequency: ${frequency}; prescale: ${prescale}`);
      }
      prescale = Math.max(0x00, Math.min(0xFF, prescale));
    }

    const oldMode = await this.read(REG_MODE1);
    const newMode = (oldMode & 0x7F) | 0x10;     // sleep
    await this.write(REG_MODE1, newMode);        // go to sleep
    await this.write(REG_PRESCALE, prescale);    // set the prescale
    await this.write(REG_MODE1, oldMode);        // wake up
    await delay(5);                              // wait 5ms
    await this.write(REG_MODE1, oldMode | 0x80); // restart
    return;
  }

  /**
   * Sets the PWM duty cycle for the specified channel.
   * @param {number} channel The channel to set. Integer range from 0 to 15.
   * @param {number} on The on time in milliseconds.
   * @param {number} off The off time in milliseconds.
   * @returns {Promise<void>} A promise that resolves when the duty cycle is set.
   */
  async setPwm(channel, on, off) {
    if (channel < 0 || channel > 15) {
      throw new Error(this.#getFormattedMessage(`Invalid channel: ${hexPad8Bit(channel)}`));
    }

    await this.#ctorPromise;
    this.#logDebugMessage(`Setting PWM channel ${hexPad8Bit(channel)} to ${hexPad16Bit(on)}/${hexPad16Bit(off)}`);

    const onL = on & 0xFF;
    const onH = (on >> 8) & 0xFF;
    const offL = off & 0xFF;
    const offH = (off >> 8) & 0xFF;

    await this.write(REG_LED0_ON_L + 4 * channel, onL);
    await this.write(REG_LED0_ON_H + 4 * channel, onH);
    await this.write(REG_LED0_OFF_L + 4 * channel, offL);
    await this.write(REG_LED0_OFF_H + 4 * channel, offH);
    return;
  }

  /**
   * Sets the PWM duty cycle for the specified channel.
   * @param {number} channel The channel to set.
   * @param {number} duty The value to set.
   * @returns {Promise<void>} A promise that resolves when the duty cycle is set.
   */
  async setMotorPwm(channel, duty) {
    await this.setPwm(channel, 0, duty);
    return;
  }

  /**
   * Sets the Servo pulse and the PWM frequency to 50Hz.
   * @param {number} channel The channel to set.
   * @param {number} pulse The pulse in milliseconds.
   * @returns {Promise<void>} A promise that resolves when the servo is set.
   */
  async setServoPulse(channel, pulse) {
    // PWM frequency is 50HZ,the period is 20000us
    const duty = Math.round(pulse * 4096 / 20000);
    await this.setPwm(channel, 0, duty);
    return;
  }

  /**
   * Stop the PCA9685 and frees the ressources.
   * @returns {Promise<void>} A promise that resolves when the PCA9685 is stopped.
   */
  async stop() {
    await this.#ctorPromise;
    await this.#syncPromise;

    this.#logDebugMessage('Stopping...');
    await this.#bus.close();
    this.#logDebugMessage('Stopped');
  }
}

export default PCA9685;
