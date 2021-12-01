export default class Registration {
    creationDate: string;
    isPublic: boolean;
    nickname: string;
    ownerID: number;
    teamID: number;

    constructor (creationDate: string, isPublic: boolean, nickname: string, ownerID: number, teamID: number){
        this.creationDate = creationDate ?? "";
        this.isPublic = isPublic;
        this.nickname = nickname ?? "";
        this.ownerID = ownerID ?? -1;
        this.teamID = teamID ?? -1;
    }
}