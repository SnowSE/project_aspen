export interface ILoggerService {
    Log(message:any):void;
    Warn(message:any):void;
    Error(message:any):void;
}