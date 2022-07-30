import App from "./app";
import LedController from "./controllers/led";

const app = new App([
  new LedController(),
], 3000);

app.listen();
