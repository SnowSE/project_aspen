export default class Person {
    id: number;
    teamID: number;
  authID: string;
  name: string;
  bio: string;
    constructor(authID: string, name: string, bio: string, teamID: number, id?: number) {
    this.id = id ?? -1;
    this.authID = authID;
    this.teamID = teamID;
    this.name = name;
    this.bio = bio;
  }
}
