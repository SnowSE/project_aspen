import { Charity } from '../models/CharityModel'
import { CharityHomePage } from '../models/CharityHomePageModel';
import { promises } from 'dns';

export interface IAPIService {
    GetCharityHomePage(Charity: Charity): Promise<CharityHomePage>
    GetAllCharities():Promise<Charity[]>
    GetCharityByID(ID: number): Promise<Charity>
    PostCreateCharity(Charity: Charity):Promise<boolean>
    PostUpdateCharity(Charity:Charity):Promise<boolean>
    PostDeleteCharity(Charity:Charity):Promise<boolean>
}