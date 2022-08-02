/**
 * Express / Socket.IO Test Server: calibration controller module
 * @module tests/express/controllers/calibration
 */

import express from "express";

import { readCalibrationData } from "../../../models/calibration.js";

class CalibrationController {
  /** @type {express.Router} */
  #router;

  get router() {
    return this.#router;
  }

  constructor() {
    this.#router = express.Router();
    this.#router.get(CalibrationController.path, this.#get);
  }

  /**
   * Handle GET /calibration
   */
  #get = (_request, response) => {
    const calibrationData = readCalibrationData();
    response.setHeader("Content-Type", "application/json");
    response.json(calibrationData);
  }
}

/** @static {string} Base path of the Calibration controller */
CalibrationController.path = "/calibration";

export default CalibrationController;
