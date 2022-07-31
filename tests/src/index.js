const i2c = require("i2c-bus");

console.log("Opening i2c bus...");
const bus = i2c.openPromisified(1);

const ADDRESS = 0x40;
const REG_MODE1 = 0x00;

bus.then((i2c1) => {
  console.log("i2c bus opened");

  return Promise.all([
    i2c1,
    i2c1.readByte(ADDRESS, REG_MODE1),
  ]);
}).then(([i2c1, data]) => {
  console.log(`data: ${data}`);

  return i2c1.close();
}).catch(console.error);
