export class Charity {
    readonly ID: number ;
    readonly Name: string;
    readonly Domain: string;
    readonly Description: string;

    public constructor(ID: number ,
        Name: string ,
        Domain: string,
        Description: string) {
        this.Description = Description;
        this.Domain = Domain;
        this.ID = ID;
        this.Name = Name
    };

}