import { IAPIService } from "./IAPIService";
import { CharityHomePage } from "../models/CharityHomePageModel";
import { Charity } from "../models/CharityModel";
import { IDomainService } from "./IDomainService";
import { Theme } from "../models/Theme";
import { Team } from "../models/TeamModel";
import { ILoggerService } from "../services/ILoggerService"

//const url = "http://206.189.218.168:5000"
//const url = "https://dev-api-aspen.k8sd.unitedangels.org"
const url = process.env.REACT_APP_API_URL 
const globaladmindomain = process.env.REACT_APP_GLOBAL_ADMIN_DOMAIN


export class APIService implements IAPIService {
    IDomainService: IDomainService;
    ILoggerService: ILoggerService;
    constructor(IDomainService: IDomainService, ILoggerService: ILoggerService) {
        this.IDomainService = IDomainService
        this.ILoggerService = ILoggerService
        //this.init();
    }

    private async init() {
        let charity = new Charity("", "Kylers Penguins", "localhost", "an awesome charity for saving the polar icecaps");
        await this.PostCreateCharity(charity);
        let actualcharity = await this.GetCharityByDomain()
        let team = new Team("Kylers Team", "the team for kyler")
        let team2 = new Team("Kylers Team2", "the team for kyler")
        await this.PostCreateTeam(team, actualcharity.ID);
        await this.PostCreateTeam(team2, actualcharity.ID);
        await this.ILoggerService.Warn(await this.GetTeamByCharityID(actualcharity.ID));
    }

    public async GetCharityHomePage(): Promise<CharityHomePage> {
        let charity: Charity = await this.GetCharityByDomain();
        let theme: Theme = await this.GetCharityThemeByID(charity.ID);
        return new CharityHomePage(theme, charity);
    }

    public async GetAllCharities(): Promise<Charity[]> {
        try {
            let headers = { "Content-Type": "application/json" };
            let newurl = url + "/admin/charity/GetAll"
            let response = await fetch(newurl, {
                method: "GET",
                headers: headers
            })
            let responseJson = await response.json()

            let charityList: Charity[] = [];

            for (let i = 0; i < responseJson.data.length; i++) {
                let id = responseJson.data[i].charityId;
                let name = responseJson.data[i].charityName;
                let description = responseJson.data[i].charityDescription;
                let res_domains = responseJson.data[i].domains;
                let charityObject = new Charity(id, name, res_domains, description);
                charityList.push(charityObject);
            }
            return charityList;
        } catch (e) {
            this.ILoggerService.Error(e);
            return [new Charity("", "ERROR", "", "")]
        }

    }

    public async GetCharityByID(ID: string): Promise<Charity> {
        try {
            let headers = { "Content-Type": "application/json" };
            let newurl = url + "/admin/charity/Get?charityid=" + ID
            let response = await fetch(newurl, {
                method: "GET",
                headers: headers
            })

            let responseJson = await response.json();
            console.error(responseJson)
            if (responseJson.status == "Success") {
                let id = responseJson.data.charityId;
                let name = responseJson.data.charityName;
                let description = responseJson.data.charityDescription;
                let res_domains = responseJson.data.domains;
                let charityObject = new Charity(id, name, res_domains, description);
                return charityObject
            } else {
                throw Error("ID not found");
            }
        } catch (e) {
            this.ILoggerService.Error("ID not found:" + e)
            let c = new Charity("asdf", "Kylers penguin's", "kyler.com", "this is where the awesome penguin's live");
            return c
        }
    }

    public async GetCharityByDomain(): Promise<Charity> {
        try {
            let domain = this.IDomainService.GetDomain();
            let headers = { "Content-Type": "application/json" };
            let newurl = url + "/Charity/Get?domain=" + domain
            let response = await fetch(newurl, {
                method: "GET",
                headers: headers
            })

            let responseJson = await response.json();
            if (responseJson.status == "Success") {
                let id = responseJson.data.charityId;
                let name = responseJson.data.charityName;
                let description = responseJson.data.charityDescription;
                let res_domains = responseJson.data.domains;
                let charityObject = new Charity(id, name, res_domains, description);
                return charityObject
            } else {
                throw Error("Domain not found");
            }
        } catch (e) {
            this.ILoggerService.Error("error:" + e);
            let c = new Charity("", "error: Charity Not Found", "error: Charity Not Found", "error: Charity Not Found");
            return c;
        }
    }

    public async GetCharityThemeByID(id: string): Promise<Theme> {
        try {
            let headers = { "Content-Type": "application/json" };
            let newurl = url + "/Charity/Gettheme?charityid=" + id
            let response = await fetch(newurl, {
                method: "GET",
                headers: headers
            })

            let responseJson = await response.json();
            if (responseJson.status == "Success") {
                this.ILoggerService.Log(responseJson.data);
                let primaryMainColor: string = responseJson.data.primaryMainColor;
                let primaryLightColor: string = responseJson.data.primaryLightColor;
                let primaryContrastColor: string = responseJson.data.primaryContrastColor;
                let secondaryMainColor: string = responseJson.data.secondaryMainColor;
                let fontFamily: string = responseJson.data.fontFamily;
                let themeObject = new Theme(primaryMainColor, primaryLightColor, primaryContrastColor, secondaryMainColor, fontFamily);
                return themeObject
            } else {
                throw Error("Domain not found");
            }
        } catch (e) {
            this.ILoggerService.Error("error:" + e);
            let themeObject = new Theme("#ff0000", "#ff0000", "#ffffff", "#ff0000", "");
            return themeObject
        }
    }

    public async PostCreateCharity(charity: Charity): Promise<boolean> {
        try {
            let headers = { "Content-Type": "application/json" };
            let body = JSON.stringify(charity);
            let newurl = url + "/Admin/Charity/Create"
            let response = await fetch(newurl, {
                method: "POST",
                mode: "cors",
                headers: headers,
                body: body
            });
            let responseJson = await response.json();
            if (responseJson.status == "Success") {
                this.ILoggerService.Log("We added the charity successfully");
                return true;
            } else {
                throw Error("adding the charity failed");
            }
        } catch (e) {
            this.ILoggerService.Error("adding the charity failed");
            return false;
        }
    }

    public async PostUpdateCharity(charity: Charity): Promise<boolean> {
        try {
            let headers = { "Content-Type": "application/json" };
            let body = JSON.stringify(charity);
            let newurl = url + "/Admin/Charity/Update"
            let response = await fetch(newurl, {
                method: "POST",
                mode: "cors",
                headers: headers,
                body: body
            })
            let responseJson = await response.json();
            if (responseJson.status == "Success") {
                this.ILoggerService.Log("We Updated the charity successfully");
                return true;
            } else {
                throw Error("Updating the charity failed");
            }
        } catch (e) {
            this.ILoggerService.Error("Updating the charity failed");
            return false;
        }

    }

    //not working error 405 method not allowed
    public async PostDeleteCharity(charity: Charity): Promise<boolean> {
        try {
            let headers = { "Content-Type": "application/json" };
            let body = JSON.stringify(charity);
            this.ILoggerService.Log("charity: " + body)
            let newurl = url + "/Admin/Charity/Delete"
            let response = await fetch(newurl, {
                method: "POST",
                mode: "cors",
                headers: headers,
                body: body
            })
            let responseJson = await response.json();
            if (responseJson.status == "Success") {
                this.ILoggerService.Log("Deleted the charity successfully");
                return true;
            } else {
                throw Error("Failed to delete the charity")
            }
        } catch (e) {
            this.ILoggerService.Error("Deleting the charity failed:" + e);
            return false;
        }
    }


    public async PostCreateTeam(team: Team, charityId: string): Promise<boolean> {
        try {
            let headers = { "Content-Type": "application/json" };
            let TeamRequest = { team: team, CharityID: charityId }
            let body = JSON.stringify(TeamRequest);
            this.ILoggerService.Log("Team: " + body)
            let newurl = url + "/Team/Create"
            let response = await fetch(newurl, {
                method: "POST",
                mode: "cors",
                headers: headers,
                body: body
            })
            let responseJson = await response.json();
            if (responseJson.status == "Success") {
                this.ILoggerService.Log("Created the Team successfully");
                return true;
            } else {
                throw Error("Failed to create the Team")
            }
        } catch (e) {
            this.ILoggerService.Error("Failed to create the Team:" + e);
            return false;
        }
    }

    public async PostUpdateTeam(team: Team, charityId: string): Promise<boolean> {
        try {
            let headers = { "Content-Type": "application/json" };
            let TeamRequest = { team: team, CharityID: charityId }
            let body = JSON.stringify(TeamRequest);
            this.ILoggerService.Log("Team: " + body)
            let newurl = url + "/Team/Update"
            let response = await fetch(newurl, {
                method: "POST",
                mode: "cors",
                headers: headers,
                body: body
            })
            let responseJson = await response.json();
            if (responseJson.status == "Success") {
                this.ILoggerService.Log("Updated the Team successfully");
                return true;
            } else {
                throw Error("Failed to Update the Team")
            }
        } catch (e) {
            this.ILoggerService.Error("Failed to Update the Team:" + e);
            return false;
        }
    }

    public async GetTeamByCharityID(charityId: string): Promise<Team[]> {
        try {
            let headers = { "Content-Type": "application/json" };
            this.ILoggerService.Log("getting teams for charityId:" + charityId)
            let newurl = url + "/Team/GetByCharityId?CharityId=" + charityId;
            let response = await fetch(newurl, {
                method: "GET",
                mode: "cors",
                headers: headers,
            })
            let responseJson = await response.json();

            if (responseJson.status == "Success") {
                this.ILoggerService.Log("Got the teams successfully");
                let array: Team[] = []
                for (let index in responseJson.data) {
                    this.ILoggerService.Error(responseJson.data[index]);
                    array.push(new Team(responseJson.data[index]["name"], responseJson.data[index]["description"]))
                }
                return array;
            } else {
                throw Error("Failed to Get Teams")
            }
        } catch (e) {
            this.ILoggerService.Error("Failed to Get Teams:" + e);
            let array: Team[] = []
            return array;
        }
    }

    public async PostDeleteTeam(team: Team, charityId: string): Promise<boolean> {
        try {
            let headers = { "Content-Type": "application/json" };
            let TeamRequest = { team: team, CharityID: charityId }
            let body = JSON.stringify(TeamRequest);
            this.ILoggerService.Log("Team: " + body)
            let newurl = url + "/Team/Delete"
            let response = await fetch(newurl, {
                method: "POST",
                mode: "cors",
                headers: headers,
                body: body
            })
            let responseJson = await response.json();
            if (responseJson.status == "Success") {
                this.ILoggerService.Log("Deleted the Team successfully");
                return true;
            } else {
                throw Error("Failed to Delete the Team")
            }
        } catch (e) {
            this.ILoggerService.Error("Failed to Delete the Team:" + e);
            return false;
        }
    }
}