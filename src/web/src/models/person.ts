export default class Person {
  id: number;
  authID: string;
  name: string;
  bio: string;
  constructor(authID: string, name: string, bio: string, id?: number) {
    this.id = id ?? -1;
    this.authID = authID;
    this.name = name;
    this.bio = bio;
  }
}
