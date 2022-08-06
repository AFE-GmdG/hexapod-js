/**
 * Calibration Models Module
 * @module models/calibration
 */

import { constants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const createDirRecursive = async (filePath) => {
  try {
    await fs.access(filePath, constants.R_OK | constants.W_OK);
  } catch (error) {
    if (error.code === "ENOENT") {
      await createDirRecursive(path.dirname(filePath));
      await fs.mkdir(filePath);
    } else {
      throw error;
    }
  }
};

export const readCalibrationData = async () => {
  const cwd = process.cwd();
  const calibrationFile = path.join(cwd, "data", "calibration.json");
  const calibrationFilePath = path.dirname(calibrationFile);

  await createDirRecursive(calibrationFilePath);

  return {
    calibrationFile,
    calibrationFilePath,
  }
}
