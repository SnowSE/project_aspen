import { IAPIService } from "./IAPIService";
import { CharityHomePage } from "../models/CharityHomePageModel";
import { Charity } from "../models/CharityModel";
import { IDomainService } from "./IDomainService";
import { Theme } from "../models/Theme";

// const url = "https://dev-api-aspen.k8sd.unitedangels.org"
const url = "http://206.189.218.168:5000"
// const url = process.env.REACT_APP_API_URL 
const globaladmindomain = process.env.REACT_APP_GLOBAL_ADMIN_DOMAIN

export class APIService implements IAPIService {
    IDomainService: IDomainService;

    constructor(IDomainService: IDomainService) {
        this.IDomainService = IDomainService
        this.Initilize();
    }

    public Initilize(){
        let kylerspenguins = new Charity("89e0a4d3-f42c-4479-af22-2a3cba6bff8a", "Kylers Penguins18","kylerspenguins2.com","Kyler has a lot of penguins")
        this.PostCreateCharity(kylerspenguins);
        let data =  this.GetCharityHomePage();
        console.error(data);
    }



    //working
    public async GetCharityHomePage(): Promise<CharityHomePage> {
        let charity: Charity = await this.GetCharityByDomain();
        let theme: Theme = await this.GetCharityThemeByID(charity.ID);
        return new CharityHomePage(theme, charity);
    }

    //working
    public async GetAllCharities(): Promise<Charity[]> {
        try{
            let headers = { "Content-Type": "application/json" };
            let newurl = url + "/admin/charity/GetAll"
            let response = await fetch(newurl, {
                method: "GET",
                headers: headers
            })
            let responseJson = await response.json()

            let charityList: Charity[] = [];

            for(let i = 0; i < responseJson.data.length;i++){
                let id = responseJson.data[i].charityId;
                let name = responseJson.data[i].charityName;
                let description = responseJson.data[i].charityDescription;
                let res_domains = responseJson.data[i].domains;
                let charityObject = new Charity(id, name, res_domains, description);
                charityList.push(charityObject);
            }



            return charityList;
        }catch(e){
            console.error(e);
            return [new Charity("","ERROR","","")]
        }

    }

    //not yet wired
    public async GetCharityByID(ID: string): Promise<Charity> {
        try{
            let headers = { "Content-Type": "application/json" };
            let newurl = url + "/admin/charity/Get?charityid="+ID
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
                throw Error("ID not found");
            }
        }catch(e){
            let c = new Charity("asdf","Kylers penguin's","kyler.com","this is where the awesome penguin's live");
            return c
        } 
    }

    //this is now working but not using the domain service
    public async GetCharityByDomain(): Promise<Charity> {
        try{
            let domain = this.IDomainService.GetDomain();
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

    //working
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


    //working
    public async PostCreateCharity(charity : Charity): Promise<boolean> {
        try{
            let headers = { "Content-Type": "application/json" };
            let body = JSON.stringify(charity);
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
    //working
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

    //not working
    public async PostDeleteCharity(charity: Charity): Promise<boolean> {
        try{
            let headers = { "Content-Type": "application/json" };
            let body = JSON.stringify(charity);
            let newurl = url + "/Admin/Charity/Delete"
            let response = await fetch(newurl, {
                method: "POST",
                mode:"cors",
                headers: headers,
                body: body
            })
            let responseJson = await response.json();
            if(responseJson.status == "Success"){
                console.error("Deleted the charity successfully");
                return true;
            }else{
                console.error("Deleting the charity failed");
                return false;
            }
        }catch(e){
            console.error("Deleting the charity failed:"+e);
            return false;
        }   
    }

}