import i2c from "i2c-bus";

export const ADDR_0x40 = 0x40;
export const ADDR_0x41 = 0x41;

/**
 * Valid Addresses of the PCA9685
 * - 0x40
 * - 0x41
 */
export type PCA9685Address = typeof ADDR_0x40
  | typeof ADDR_0x41;

export const REG_MODE1 = 0x00;
export const REG_LED0_ON_L = 0x06;
export const REG_LED0_ON_H = 0x07;
export const REG_LED0_OFF_L = 0x08;
export const REG_LED0_OFF_H = 0x09;
export const REG_PRESCALE = 0xFE;

/**
 * Valid Registers of the PCA9685
 * - 0x00 (REG_MODE1)
 * - 0x06 (REG_LED0_ON_L)
 * - 0x07 (REG_LED0_ON_H)
 * - 0x08 (REG_LED0_OFF_L)
 * - 0x09 (REG_LED0_OFF_H)
 * - 0xFE (REG_PRESCALE)
 */
export type PCA9685Register = typeof REG_MODE1
  | typeof REG_LED0_ON_L
  | typeof REG_LED0_ON_H
  | typeof REG_LED0_OFF_L
  | typeof REG_LED0_OFF_H
  | typeof REG_PRESCALE;

/**
 * ``` txt
 * =========================================
 * Raspi PCA9685 16-Channel PWM Servo Driver
 * =========================================
 * ```
 */
class PCA9685 {
  private bus: i2c.I2CBus;
  private address: PCA9685Address;
  private debug: boolean;

  constructor(address: PCA9685Address, debug: boolean = false) {
    this.bus = i2c.openSync(1);
    this.address = address;
    this.debug = debug;
    this.write(REG_MODE1, 0x00);
  }

  /**
   * Writes an 8-bit value to the specified register
   * @param register The register to write to
   * @param value The value to write
   */
  public write(register: PCA9685Register, value: number) {
    if (this.debug) {
      console.log(`[PCA9685] Writing to ${this.address}:${register} = ${value}`);
    }
    this.bus.writeByteSync(this.address, register, value & 0xff);
  }

  /**
   * Reads an 8-bit value from the specified register
   * @param register The register to read from
   * @returns The value read from the register
   */
  public read(register: PCA9685Register): number {
    if (this.debug) {
      console.log(`[PCA9685] Reading from ${this.address}:${register}`);
    }
    return this.bus.readByteSync(this.address, register);
  }

  public setPWMFrequency(frequency: number) {
    let prescale = Math.floor(25000000 / (4096 * frequency) - 1); // +0.5? See S:\Work\Freenove_Big_Hexapod_Robot_Kit_for_Raspberry_Pi\Code\Server\PCA9685.py:49
    if (!Number.isInteger(prescale) || prescale < 0x00 || prescale > 0xff) {
      if (this.debug) {
        console.log(`[PCA9685] Invalid frequency: ${frequency}; prescale: ${prescale}`);
      }
      prescale = (Math.max(0x00, Math.min(0xFF, prescale))) | 0;
    }

    const oldMode = this.read(REG_MODE1);
    const newMode = ((oldMode & 0x7F) | 0x10); // sleep
    this.write(REG_MODE1, newMode);            // go to sleep
    this.write(REG_PRESCALE, prescale);
    this.write(REG_MODE1, oldMode);            // wake up
    // sleep for 5ms
    this.write(REG_MODE1, (oldMode | 0x80));   // restart
  }

  public stop() {
    return new Promise<void>((resolve) => {
      this.write(REG_MODE1, 0x00);
      this.bus.close(() => resolve());
    });
  }
};

export default PCA9685;
