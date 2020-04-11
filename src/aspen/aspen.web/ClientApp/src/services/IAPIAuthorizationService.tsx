import Token from "../models/TokenModel";

export default interface IAPIAuthorizationService {
    Login(username: string, password: string): Promise<Token>;
    Register(username: string, password: string): Promise<any>;
}