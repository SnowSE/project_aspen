export default function Person(authID, name, bio){
    this.authID = authID ?? ""
    this.name = name ?? ""
    this.bio = bio ?? ""
}