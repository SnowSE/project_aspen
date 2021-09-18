import {IDomainService} from './IDomainService';

export class DummyDomainService implements IDomainService{
    GetDomain() {
        return "kylerspenguins2.com"
    }
}