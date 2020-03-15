import { Charity } from '../models/CharityModel'
import { CharityHomePage } from '../models/CharityHomePageModel';

export interface IAPIService {
    GetCharityHomePage(Charity: Charity): Promise<CharityHomePage>
}