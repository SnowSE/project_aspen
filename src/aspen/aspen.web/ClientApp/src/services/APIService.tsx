import { IAPIService } from "./IAPIService";
import { CharityHomePage } from "../models/CharityHomePageModel";
import { Charity } from "../models/CharityModel";
import { IDomainService } from "./IDomainService";
import { Theme } from "../models/Theme";


export class APIService implements IAPIService {
    IDomainService: IDomainService;

    constructor(IDomainService: IDomainService) {
        this.IDomainService = IDomainService
    }

    async GetCharityHomePage(): Promise<CharityHomePage> {
        let domain = this.IDomainService.GetDomain();
        let url = ""
        let headers = { "Content-Type": "application/json" };
        url = url + "/"+ domain;
        let response = await fetch(url, {
            method: "GET",
            headers: headers
        })

        let responseJson = await response.json()
        if(responseJson.Status == "Success"){
            let id = responseJson["data"]["id"];
            let name = responseJson["data"]["name"];
            let domain = responseJson["data"]["domain"];
            let description = responseJson["data"]["description"];
            let charityObject = new Charity(id, name, domain, description)
            
            let fontFamily = responseJson["data"]["fontFamily"];
            let PrimaryMainColor = responseJson["data"]["PrimaryMainColor"];
            let PrimaryLightColor = responseJson["data"]["PrimaryLightColor"];
            let PrimaryContrastTextColor = responseJson["data"]["PrimaryContrastTextColor"];
            let SecondaryMainColor = responseJson["data"]["SecondaryMainColor"];
            let theme =  new Theme(PrimaryMainColor, PrimaryLightColor, PrimaryContrastTextColor, SecondaryMainColor, fontFamily)
            // TODO get the theme and place it here. 
            return new CharityHomePage(theme, charityObject)
        }
        let theme = new Theme("#438f00","#67cc0e","#FFFFFF", "#608045","Arial");
        let charityObject = new Charity(1,"Kylers penguin's","kyler.com","this is where the awesome penguin's live")
        let charityHomePage = new CharityHomePage(theme,charityObject);
        return new CharityHomePage(theme, charityObject);
        
        
        
        
    }

}