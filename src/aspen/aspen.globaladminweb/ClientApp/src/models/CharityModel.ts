export class Charity {
    readonly ID: string ;
    readonly CharityName: string;
    readonly CharityDescription: string;
    readonly Domains: [any];

    public constructor(ID: string ,
        CharityName: string ,
        Domains: string,
        CharityDescription: string) {
        this.CharityDescription = CharityDescription;
        this.Domains = [{charitydomain: Domains}];
        this.ID = ID;
        this.CharityName = CharityName
    };

}