export default class Team {
    id: number;
    description: string;
    mainImage: string;
    ownerID: number;
    eventID: number;

    constructor (description: string, mainImage: string, owenerId: number, eventId: number, id?: number){
        this.id = id ?? -1;
        this.description = description ?? "";
        this.mainImage = mainImage ?? "";
        this.ownerID = owenerId ?? -1;
        this.eventID = eventId ?? -1;
    }
}