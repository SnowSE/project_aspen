import Person from "./person";

export default class Registration {
    id: number;
    creationDate: string;
    isPublic: boolean;
    nickname: string;
    ownerID: number;
    teamID: number;
    personRegistrations:[
        {
            personID: number,
            person: Person {
                authID: string,
                name: string,
                bio: string
            },
            createdDate: Date
        }
    ]
  
    constructor(creationDate: string, isPublic: boolean, nickname: string, ownerID: number, teamID: number, id: number, personRegistrations:PersonRegistratoins[]){
        this.id = id;
        this.creationDate = creationDate;
        this.isPublic = isPublic;
        this.nickname = nickname;
        this.ownerID = ownerID;
        this.teamID = teamID;
        this.personRegistrations =[]

    }
}