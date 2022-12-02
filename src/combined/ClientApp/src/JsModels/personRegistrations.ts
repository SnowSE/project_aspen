import Person from "./person";


export default class PersonRegistrations {
    id: number;
    personID: number;
    person: Person;
       
    createDate: Date;

   constructor(id: number, personID: number, person: Person, createDate: Date)
    {
        this.id = id ?? -1;
        this.personID = personID ?? undefined;
        this.person = person;
        this.createDate = createDate;
    
    }
}
