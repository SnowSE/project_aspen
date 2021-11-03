export default class Person {
  ID: number = -1;
  authID: string;
  name: string;
  bio: string;
  constructor(authID: string, name: string, bio: string) {
    this.authID = authID ?? "";
    this.name = name ?? "";
    this.bio = bio ?? "";
  }
}
