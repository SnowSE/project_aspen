import IAPIAuthorizationService from "./IAPIAuthorizationService";
import Token from "../models/TokenModel";

export default class APIAuthorizationService implements IAPIAuthorizationService {
    readonly url = "http://206.189.218.168";
    public async Login(username: string, password: string): Promise<Token> {
        try{
            let newurl = this.url + "/Login";
            let body = JSON.stringify({User:user});
            let headers = { "Content-Type": "application/json" };
            let response = await fetch(newurl, {
                method: "POST",
                mode:"cors",
                headers: headers,
                body: body
            })
            let responseJson = await response.json();
            if(responseJson.Status == "success"){
                let token = new Token(responseJson.accessToken)
                return token;
            }else{
                throw Error("Login Failed");
            }

        }catch(e){
            console.error(e)
            return null
        }
    }

    Register(username: string, password: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

}