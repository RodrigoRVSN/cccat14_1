
import { inject } from "../di/Registry";
import { HttpServer } from "../http/HttpServer";

export class MainController {
  @inject("httpServer")
  httpServer?: HttpServer;

  constructor() {
  }
}
