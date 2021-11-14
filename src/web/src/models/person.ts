export default class Person {
  ID: number;
  authID: string;
  name: string;
  bio: string;
  constructor(authID: string, name: string, bio: string, id?: number) {
    this.ID = id ?? -1;
    this.authID = authID ?? "";
    this.name = name ?? "";
    this.bio = bio ?? "";
  }
}
