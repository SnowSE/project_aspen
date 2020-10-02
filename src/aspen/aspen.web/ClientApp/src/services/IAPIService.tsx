import { Charity } from '../models/CharityModel'
import { CharityHomePage } from '../models/CharityHomePageModel';
import {Team} from "../models/TeamModel";


export interface IAPIService {
    GetCharityHomePage(Charity: Charity): Promise<CharityHomePage>
    GetAllCharities():Promise<Charity[]>
    GetCharityByID(ID: string): Promise<Charity>
    PostCreateCharity(charity : Charity):Promise<boolean>
    PostUpdateCharity(Charity:Charity):Promise<boolean>
    PostDeleteCharity(Charity:Charity):Promise<boolean>
    PostUpdateTeam(team:Team,charityId: string): Promise<boolean>
    PostCreateTeam(team:Team,charityId: string): Promise<boolean>
    GetTeamByCharityID(charityId: string):Promise<Team[]>
}