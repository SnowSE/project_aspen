export default class Link {
    id?: number;
    eventID: number;
    personID?: number;
    date: Date;
    linkUrl: string;

    constructor(
        eventID: number,
        date: Date,
        linkUrl: string,
        personID?: number,
        id?: number

    ) {
        this.eventID = eventID;
        this.personID = personID ?? undefined;
        this.date = date ?? new Date();
        this.linkUrl = linkUrl;
        this.id = undefined;
    }
}