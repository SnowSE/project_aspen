export default class Team {
    Id: number;
    description: string;
    mainImage: string;
    owenerId: number;
    eventId: number;

    constructor (description: string, mainImage: string, owenerId: number, eventId: number, id?: number){
        this.Id = id ?? -1;
        this.description = description ?? "";
        this.mainImage = mainImage ?? "";
        this.owenerId = owenerId ?? -1;
        this.eventId = eventId ?? -1;
    }
}