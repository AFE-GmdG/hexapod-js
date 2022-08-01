/**
 * LED Controller Module
 * @module controllers/led
 */

import express from "express";

class LedController {
  /** @type {express.Router} */
  router;

  constructor() {
    this.router = express.Router();
    this.router.post(`${LedController.path}/on`, this.#on);
    this.router.post(`${LedController.path}/off`, this.#off);
  }

  /**
   * Handle POST /led/on
   * @param {express.Request} request
   * @param {express.Response} response
   */
  #on = (_request, response) => {
    response.setHeader("Content-Type", "application/json");
    response.json({ message: "on" });
  }

  /**
   * Handle POST /led/off
   * @param {express.Request} _request
   * @param {express.Response} response
   */
  #off = (_request, response) => {
    response.setHeader("Content-Type", "application/json");
    response.json({ message: "off" });
  }
}

/** @static {string} Base path of the Led controller */
LedController.path = "/led";

export default LedController;
