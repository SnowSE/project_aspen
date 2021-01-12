import Token from "../models/TokenModel";

export default interface IAPIAuthorizationService {
    Login(username: string, password: string, charityId: string): Promise<Token | null>;
    Register(username: string, password: string): Promise<any>;
}