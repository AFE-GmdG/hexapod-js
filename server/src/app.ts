// import fs from 'fs/promises';
import { Server } from 'http';

import express from "express";
// import spdy from "spdy";
import bodyParser from "body-parser";
import proxy from "express-http-proxy";

import { Controllers } from "./controllers";

class App {
  public app: express.Application;
  public port: number;
  private server: Server | null;

  constructor(controllers: Controllers, port: number) {
    this.app = express();
    this.port = port;
    this.server = null;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeStaticFiles();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    // this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initializeControllers(controllers: Controllers) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  private initializeStaticFiles() {
    this.app.use("/", proxy("http://127.0.0.1:5000", {

    }));
  }

  private initializeErrorHandling() {
    this.app.use((_request: express.Request, response: express.Response) => {
      response.setHeader("Content-Type", "application/json");
      response.status(404);
      response.json({ message: "Not found" });
    });
  }

  public async listen() {
    this.server = await new Promise<Server>((resolve) => {
      const server = this.app.listen(this.port, () => {
        console.log(`Listening on port ${this.port}`);
        resolve(server);
      });
    });

    return this.server;
    // const key = await fs.readFile("./certificates/debug.key");
    // const cert = await fs.readFile("./certificates/debug.crt");
    // const server = spdy.createServer({ key, cert }, this.app);
    // server.listen(this.port, (err?: any) => {
    //   if (err) {
    //     throw new Error(err);
    //   }
    //   console.log(`Listening on port ${this.port}`);
    // });
  }

  public stop() {
    return new Promise<Error | undefined>((resolve) => {
      if (this.server) {
        this.server.close(resolve);
      } else {
        resolve(undefined);
      }
    });
  }
}

export default App;
