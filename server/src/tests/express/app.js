/**
 * Express / Socket.IO Test Server: app module
 * @module tests/express/app
 */

import http, { createServer } from "node:http";
import path from "node:path";
import process from "node:process";

import bodyParser from "body-parser";
import express from "express";
import proxy from "express-http-proxy";
import { Server } from "socket.io";

import CalibrationController from "./controllers/calibration.js";

/** @class App */
class App {
  /** @type {express.Application} Express application instance */
  #app;

  /** @type {number} Port number of the express application instance */
  #port;

  /** @type {http.Server} Http server instance of the running app */
  #httpServer;

  /** @type {Server} Socket.IO server instance */
  #ioServer;

  constructor() {
    this.#app = express();
    this.#port = 3000;
    this.#httpServer = createServer(this.#app);
    this.#ioServer = new Server(this.#httpServer, {
      path: "/io",
      serveClient: false,
      transports: ["websocket"],
    });

    this.#serveStandardAssets();
    this.#initializeMiddlewares();
    this.#initializeControllers();
    this.#initializeErrorHandling();
    this.#initializeSocketIO();
  }

  #serveStandardAssets() {
    this.#app.use((request, response, next) => {
      if (request.url === "/favicon.ico" && request.method === "GET") {
        const faviconPath = path.join(process.cwd(), "public", "assets", "favicon.ico");
        response.setHeader("Content-Type", "image/x-icon");
        response.status(200);
        response.sendFile(faviconPath);
        return;
      }
      next();
    });
  }

  #initializeMiddlewares() {
    // Development Proxy must be used before the body parser.
    this.#app.use("/", proxy("http://localhost:5000", {
      filter: (req) => !(req.path.startsWith("/api") || req.path.startsWith("/io")),
    }));
    this.#app.use(bodyParser.json());
  }

  #initializeControllers() {
    this.#app.use("/api", new CalibrationController().router);
  }

  #initializeErrorHandling() {
    this.#app.use((_request, response) => {
      response.setHeader("Content-Type", "application/json");
      response.status(404);
      response.json({ message: "Not found" });
    });
  }

  #initializeSocketIO() {
    this.#ioServer.on("connection", (socket) => {
      console.log(`Socket.IO connection established: ${socket.id}`);
      // socket.use() ... Controllers
    });
  }

  /**
   * Starts the server.
   * @returns {Promise<void>} Promise that resolves when the server is listening
   */
  start() {
    return new Promise((resolve) => {
      this.#httpServer.listen(this.#port, () => {
        console.log(`Listening on port ${this.#port}`);
        resolve();
      });
    });
  }

  /**
   * Stops the server.
   * @returns {Promise<void>} Promise that resolves when the server is stopped
   */
  stop() {
    return new Promise((resolve) => {
      this.#ioServer.disconnectSockets(true);
      this.#httpServer.close(() => {
        console.log(`Server stopped`);
        resolve();
      });
    });
  }
}

export default App;
