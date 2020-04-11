import IAPIAuthorizationService from "./IAPIAuthorizationService";
import Token from "../models/TokenModel";
import { ILoggerService } from "./ILoggerService"

export default class APIAuthorizationService implements IAPIAuthorizationService {
    readonly url = "http://206.189.218.168:5000";
    readonly iloggerservice: ILoggerService;
    constructor(ILoggerService: ILoggerService) {
        this.iloggerservice = ILoggerService
    }
    public async Login(username: string, password: string): Promise<Token | null> {
        try {
            let newurl = this.url + "/Admin/User/Authenticate";
            let body = JSON.stringify({

                Username: username,
                Password: password,
                Charity: "some garbage"
            }
            );
            let headers = { "Content-Type": "application/json" };
            let response = await fetch(newurl, {
                method: "POST",
                mode: "cors",
                headers: headers,
                body: body
            })
            let responseJson = await response.json();
            console.error(responseJson)
            if (responseJson.status == "Success") {
                let token = new Token(responseJson.data)
                this.iloggerservice.Error(token.key);
                return token;

            } else {
                throw Error("Login Failed");
            }

        } catch (e) {
            this.iloggerservice.Error(e)
            return null
        }
    }

    Register(username: string, password: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

}