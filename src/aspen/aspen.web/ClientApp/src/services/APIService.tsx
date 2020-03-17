import { IAPIService } from "./IAPIService";
import { CharityHomePage } from "../models/CharityHomePageModel";
import { Charity } from "../models/CharityModel";
import { IDomainService } from "./IDomainService";
import { Theme } from "../models/Theme";

const url = process.env.API_URL

export class APIService implements IAPIService {
    IDomainService: IDomainService;

    constructor(IDomainService: IDomainService) {
        this.IDomainService = IDomainService
    }


    public async GetCharityHomePage(): Promise<CharityHomePage> {
        let domain = this.IDomainService.GetDomain();
        let headers = { "Content-Type": "application/json" };
        let newurl = url + "/getcharitybydomain/"+ domain;
        let response = await fetch(newurl, {
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
        //TODO: make a second api call to get the theme and remove the theme from the first api call 

        let theme = new Theme("#438f00","#67cc0e","#FFFFFF", "#608045","Arial");
        let charityObject = new Charity(1,"Kylers penguin's","kyler.com","this is where the awesome penguin's live")
        let charityHomePage = new CharityHomePage(theme,charityObject);
        return new CharityHomePage(theme, charityObject); 
    }


    public async GetAllCharities(): Promise<Charity[]> {
        let headers = { "Content-Type": "application/json" };
        let newurl = url + "/Charity/GetAll"
        let response = await fetch(newurl, {
            method: "GET",
            headers: headers
        })

        let responseJson = await response.json()


        return [new Charity(1,"Kylers penguin's","kyler.com","this is where the awesome penguin's live")]
    }
    public async GetCharityByID(charity: Charity): Promise<Charity> {
        let headers = { "Content-Type": "application/json" };
        let newurl = url + "/Charity/get/"+charity.ID.toString
        let response = await fetch(newurl, {
            method: "GET",
            headers: headers
        })

        let responseJson = await response.json();

        let c = new Charity(1,"Kylers penguin's","kyler.com","this is where the awesome penguin's live");
        return c 
    }
    public async PostCreateCharity(charity: Charity): Promise<boolean> {
        let headers = { "Content-Type": "application/json" };
        let body = JSON.stringify(charity);
        let newurl = url + "/Charity/Create"
        let response = await fetch(newurl, {
            method: "POST",
            headers: headers,
            body: body
        })

        let responseJson = await response.json();
        return true;
    }
    public async PostUpdateCharity(charity: Charity): Promise<boolean> {
        let headers = { "Content-Type": "application/json" };
        let body = JSON.stringify(charity);
        let newurl = url + "/Charity/Update"
        let response = await fetch(newurl, {
            method: "POST",
            headers: headers,
            body: body
        })

        let responseJson = await response.json();
        return true;
    }
    public async PostDeleteCharity(charity: Charity): Promise<boolean> {
        let headers = { "Content-Type": "application/json" };
        let body = JSON.stringify(charity);
        let newurl = url + "/Charity/Update"
        let response = await fetch(newurl, {
            method: "POST",
            headers: headers,
            body: body
        })

        let responseJson = await response.json();
        return true;
    }

}