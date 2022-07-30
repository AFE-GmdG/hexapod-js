import express from "express";

class LedController {
  private static readonly path = "/led";
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post(`${LedController.path}/on`, this.on);
    this.router.post(`${LedController.path}/off`, this.off);
  }

  private on = (_request: express.Request, response: express.Response) => {
    response.setHeader("Content-Type", "application/json");
    response.json({ message: "on" });
  }

  private off = (_request: express.Request, response: express.Response) => {
    response.setHeader("Content-Type", "application/json");
    response.json({ message: "off" });
  }
}

export default LedController;
