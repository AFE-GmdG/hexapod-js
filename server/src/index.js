/**
 * main module (index.js)
 * @module index
 */
import { program, Argument, Option, InvalidArgumentError } from "commander";

import interactiveTest from "./tests/interactive.js";
import servoTest from "./tests/servo.js";
import socketTest from "./tests/express/server.js";

/**
 * Parses the port command line argument.
 * @param {string} port The port argument value.
 * @returns {number} The port to listen on as number.
 */
function parsePort(port) {
  const portNumber = parseInt(port, 10);
  if (isNaN(portNumber) || parseFloat(port) !== portNumber || portNumber < 1 || portNumber > 65535) {
    throw new InvalidArgumentError(`Invalid port number: ${port}`);
  }
  if (portNumber === 5000) {
    throw new InvalidArgumentError("Port number 5000 is reserved for the development proxy.");
  }
  return portNumber;
}

program
  .name("hexapod-js")
  .usage("command [options]")
  .version("0.0.1", "-v, --version");

program
  .command("run")
  .description("run the hexapod server")
  .addOption(
    new Option("-m, --mode <mode>", "mode of the server")
      .choices(["development", "production"])
      .env("MODE")
      .default("production")
  )
  .addOption(
    new Option("-p, --port <port>", "port of the server")
      .argParser(parsePort)
      .env("PORT")
      .default(3000)
  )
  .addOption(
    new Option("-i, --interactive", "interactive mode")
  )
  .action((options) => {
    console.log({ command: "run", ...options });
  });

program
  .command("test")
  .description("run a hexapod tests")
  .addArgument(
    new Argument("module", "the module to test")
      .choices(["Servo", "Led", "Buzzer", "Camera", "Battery", "Gyro", "Ultrasonic", "Socket.IO"])
      .argOptional()
  )
  .addOption(
    new Option("-i, --interactive", "interactive mode")
  )
  .action(
    /**
     * @param {"Servo" | "Led" | "Buzzer" | "Camera" | "Battery" | "Gyro" | "Ultrasonic" | "Socket.IO"} module The module to test.
     * @param {{interactive?: boolean}} options Interactive mode.
     */
    async (module, options) => {
      if (!options.interactive && !module) {
        console.log("error: missing required argument 'module'");
        return;
      }

      if (options.interactive) {
        await interactiveTest();
        return;
      }

      switch (module) {
        case "Servo":
          await servoTest();
          return;
        case "Socket.IO":
          await socketTest();
          return;
        default:
          console.log({ command: "test", module });
      }
    }
  );

program.parse();
