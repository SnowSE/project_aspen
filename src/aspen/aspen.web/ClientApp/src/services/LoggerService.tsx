import {ILoggerService} from "./ILoggerService";

export class LoggerService implements ILoggerService{
    Log(message: any) {
        console.log(message);
    }
    Warn(message: any) {
        console.warn(message);
    }
    Error(message: any) {
        console.error(message);
    }

}