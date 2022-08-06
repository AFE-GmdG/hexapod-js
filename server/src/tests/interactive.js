/**
 * interactive test module
 * @module tests/interactive
 */

import ansiEscapes from "ansi-escapes";
import inquirer from "inquirer";

import { terminalSize } from "../common.js";

async function interactiveTest() {
  const { rows } = terminalSize();
  const pageSize = rows - 2;

  const questions = [
    {
      type: "list",
      loop: false,
      name: "module",
      message: "Which module do you like to test?",
      choices: [
        "Servo",
        "Led",
        "Buzzer",
        "Camera",
        "Battery",
        "Gyro",
        "Ultrasonic",
        "Socket.IO",
        new inquirer.Separator(),
        "Exit",
      ],
      pageSize,
    },
  ];

  console.log(ansiEscapes.clearScreen);
  const answers = await inquirer.prompt(questions);

  console.log(JSON.stringify(answers, null, "  "));
  if (answers.module === "Exit") {
    return;
  }
}

export default interactiveTest;
