/**
 * Calibration Models Module
 * @module models/calibration
 */

// import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export const readCalibrationData = () => {
  const cwd = process.cwd();

  return {
    path: path.join(cwd, "data", "calibration.json"),
  }
}
