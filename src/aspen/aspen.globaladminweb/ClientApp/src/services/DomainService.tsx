import {IDomainService} from './IDomainService';

export class DomainService implements IDomainService{
    GetDomain() {
        return window.location.hostname
    }
}