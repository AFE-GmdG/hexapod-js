import PCA9685 from "./pca9685";

class Servo {
  private pwm40: PCA9685;
  private pwm41: PCA9685;

  constructor() {
    this.pwm40 = new PCA9685(0x40, true);
    this.pwm41 = new PCA9685(0x41, true);

    this.pwm40.setPWMFrequency(50);
    this.pwm41.setPWMFrequency(50);
  }

  public async stop() {
    await this.pwm41.stop();
    await this.pwm40.stop();
  }
}

export default Servo;
