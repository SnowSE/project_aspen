import { IAPIService } from "./IAPIService";
import { CharityHomePage } from "../models/CharityHomePageModel";
import { Charity } from "../models/CharityModel";
import { IDomainService } from "./IDomainService";
import { Theme } from "../models/Theme";

const url = "http://192.168.107.128:5000" 

// const url = process.env.REACT_APP_API_URL 
const globaladmindomain = process.env.REACT_APP_GLOBAL_ADMIN_DOMAIN

export class APIService implements IAPIService {
    IDomainService: IDomainService;

    constructor(IDomainService: IDomainService) {
        this.IDomainService = IDomainService
    }

    public async GetCharityThemeByID(id :string):Promise<Theme>{
        try{
            let headers = { "Content-Type": "application/json" };
            let newurl = url + "/Charity/Gettheme?charityid="+id
            let response = await fetch(newurl, {
                method: "GET",
                headers: headers
            })

            let responseJson = await response.json();
            if(responseJson.status == "Success"){
                console.error(responseJson.data);
                let primaryMainColor:string = responseJson.data.primaryMainColor;
                let primaryLightColor:string = responseJson.data.primaryLightColor;
                let primaryContrastColor:string = responseJson.data.primaryContrastColor;
                let secondaryMainColor:string = responseJson.data.secondaryMainColor;
                let fontFamily:string = responseJson.data.fontFamily;
                let themeObject = new Theme(primaryMainColor,primaryLightColor,primaryContrastColor,secondaryMainColor,fontFamily);
                return themeObject
            }else{
                throw Error("Domain not found");
            }
        }catch(e){
            console.error("error:"+e);
            let themeObject = new Theme("","","","","");
            return themeObject
        }
    }


    public async GetCharityHomePage(): Promise<CharityHomePage> {
        let charity: Charity = await this.GetCharityByDomain();
        let theme: Theme = await this.GetCharityThemeByID(charity.ID);
        return new CharityHomePage(theme, charity);
        //TODO: make a second api call to get the theme and remove the theme from the first api call 
        // let theme = new Theme("#438f00","#67cc0e","#FFFFFF", "#608045","Arial");
        // let charityObject = new Charity(1,"FAILED","FAILED","FAILED")
        // let charityHomePage = new CharityHomePage(theme,charityObject);
    }


    public async GetAllCharities(): Promise<Charity[]> {
        let headers = { "Content-Type": "application/json" };
        let newurl = url + "admin/charity/GetAll"
        let response = await fetch(newurl, {
            method: "GET",
            headers: headers
        })

        let responseJson = await response.json()
        console.error(responseJson)

        return [new Charity(1,"Kylers penguin's","kyler.com","this is where the awesome penguin's live")]
    }

    public async GetCharityByID(ID: string): Promise<Charity> {
        let headers = { "Content-Type": "application/json" };
        let newurl = url + "/Charity/Get?Id="+ID
        let response = await fetch(newurl, {
            method: "GET",
            headers: headers
        })

        let responseJson = await response.json();

        let c = new Charity("","Kylers penguin's","kyler.com","this is where the awesome penguin's live");
        return c 
    }

    //this is now working but not using the domain service
    public async GetCharityByDomain(): Promise<Charity> {
        try{
            let domain = "kylerspenguins2.com";
            let headers = { "Content-Type": "application/json" };
            let newurl = url + "/Charity/Get?domain="+domain
            let response = await fetch(newurl, {
                method: "GET",
                headers: headers
            })

            let responseJson = await response.json();
            if(responseJson.status == "Success"){
                let id = responseJson.data.charityId;
                let name = responseJson.data.charityName;
                let description = responseJson.data.charityDescription;
                let res_domains = responseJson.data.domains;
                let charityObject = new Charity(id, name, res_domains, description);
                return charityObject
            }else{
                throw Error("Domain not found");
            }
        }catch(e){
            console.error("error:"+e);
            let c = new Charity("","error","error","error");
            return c;
        }
    }

    //This works successfully -kyler
    public async PostCreateCharity(charity : Charity): Promise<boolean> {
        try{
            let headers = { "Content-Type": "application/json" };
            let body = JSON.stringify(charity);
            console.error("body:"+body);
            let newurl = url + "/Admin/Charity/Create"
            let response = await fetch(newurl, {
                method: "POST",
                mode:"cors",
                headers: headers,
                body: body
            });
            let responseJson = await response.json();
            if(responseJson.status == "Success"){
                console.error("We added the charity successfully");
                return true;
            }else{
                console.error("adding the charity failed");
                return false;
            }
        }catch(e){
            console.error("adding the charity failed");
            return false;
        }  
    }
    //this is talking to the api correctly
    public async PostUpdateCharity(charity: Charity): Promise<boolean> {
        try{
            let headers = { "Content-Type": "application/json" };
            let body = JSON.stringify(charity);
            let newurl = url + "/Admin/Charity/Update"
            let response = await fetch(newurl, {
                method: "POST",
                mode:"cors",
                headers: headers,
                body: body
            })
            let responseJson = await response.json();
            if(responseJson.status == "Success"){
                console.error("We Updated the charity successfully");
                return true;
            }else{
                console.error("Updating the charity failed");
                return false;
            }
        }catch(e){
            console.error("Updating the charity failed");
            return false;
        }   

    }

    public async PostDeleteCharity(charity: Charity): Promise<boolean> {
        let headers = { "Content-Type": "application/json" };
        let body = JSON.stringify(charity);
        let newurl = url + "/Charity/Delete"
        let response = await fetch(newurl, {
            method: "POST",
            headers: headers,
            body: body
        })

        let responseJson = await response.json();
        return true;
    }

}