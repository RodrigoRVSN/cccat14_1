import { Logger } from "../../application/logger/Logger";

export class LoggerConsole implements Logger {
  log(message: string) {
    console.log(message)
  }
}