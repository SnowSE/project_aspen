export default class Person {
  id: number;
  authID: string;
  name: string;
  bio: string;
  nickName: string;
  constructor(authID: string, name: string, bio: string, nickName:string, id?: number) {
    this.id = id ?? -1;
    this.authID = authID;
    this.name = name;
      this.bio = bio;
      this.nickName = nickName;
  }
}
