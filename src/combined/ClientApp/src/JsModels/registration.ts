export default class Registration {
    id: number;
    creationDate: string;
    isPublic: boolean;
    nickname: string;
    ownerID: number;
    teamID: number;
  
    constructor (creationDate: string, isPublic: boolean, nickname: string, ownerID: number, teamID: number, id: number){
        this.id = id;
        this.creationDate = creationDate;
        this.isPublic = isPublic;
        this.nickname = nickname;
        this.ownerID = ownerID;
        this.teamID = teamID;
    }
}