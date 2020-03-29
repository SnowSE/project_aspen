import { Charity } from '../models/CharityModel'
import { CharityHomePage } from '../models/CharityHomePageModel';


export interface IAPIService {
    GetCharityHomePage(Charity: Charity): Promise<CharityHomePage>
    GetAllCharities():Promise<Charity[]>
    GetCharityByID(ID: string): Promise<Charity>
    PostCreateCharity(charity : Charity):Promise<boolean>
    PostUpdateCharity(Charity:Charity):Promise<boolean>
    PostDeleteCharity(Charity:Charity):Promise<boolean>
}