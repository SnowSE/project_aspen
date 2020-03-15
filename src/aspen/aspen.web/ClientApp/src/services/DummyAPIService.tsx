import { APIService } from "./APIService"
import { IDomainService } from "./IDomainService";
import { CharityHomePage } from "../models/CharityHomePageModel";
import { Charity } from "../models/CharityModel";
import { Theme } from "../models/Theme";
import {DomainService} from "./DomainService"

export class DummyAPIService implements APIService{
    IDomainService: IDomainService = new DomainService();
    GetCharityHomePage(): CharityHomePage {
        let theme = new Theme("#438f00","#67cc0e","#FFFFFF", "#608045","Arial");
        let charity = new Charity(1,"Kylers penguin's","kyler.com","this is where the awesome penguin's live")
        let charityHomePage = new CharityHomePage(theme,charity);
        
        return charityHomePage;
    }
}