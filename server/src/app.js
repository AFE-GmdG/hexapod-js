/**
 * App module
 * @module app
 */

import express from "express";
import bodyParser from "body-parser";
import proxy from "express-http-proxy";

/** @class App */
class App {
  /** @type {express.Application} Express application instance */
  #app;

  /** @type {number} Port number of the express application instance */
  #port;

  /** @type {http.Server} Http server instance of the running app */
  #server;

  /**
   * Creates the App instance.
   * @param {Controller[]} controllers Array of express controllers
   * @param {number} port
   */
  constructor(controllers, port) {
    this.#app = express();
    this.#port = port;
    this.#server = null;

    this.#initializeMiddlewares();
    this.#initializeControllers(controllers);
    this.#initializeStaticFiles();
    this.#initializeErrorHandling();
  }

  #initializeMiddlewares() {
    // Developer Proxy must be used before the body parser.
    this.#app.use("/", proxy("http://127.0.0.1:5000", {
      filter: (req) => !(req.path.startsWith("/api") || req.path.startsWith("/io")),
    }));
    this.#app.use(bodyParser.json());
    // this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  #initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.#app.use("/api", controller.router);
    });
  }

  #initializeStaticFiles() {
  }

  #initializeErrorHandling() {
    this.#app.use((_request, response) => {
      response.setHeader("Content-Type", "application/json");
      response.status(404);
      response.json({ message: "Not found" });
    });
  }

  async listen() {
    this.#server = await new Promise((resolve) => {
      const server = this.#app.listen(this.#port, () => {
        console.log(`Listening on port ${this.#port}`);
        resolve(server);
      });
    });

    return this.#server;
  }

  stop() {
    return new Promise((resolve) => {
      if (this.#server) {
        this.#server.close(resolve);
      } else {
        resolve(undefined);
      }
    });
  }
}

export default App;
