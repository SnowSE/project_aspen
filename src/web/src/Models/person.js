export default function person(authID, name, bio){
    this.authID = authID ?? ""
    this.name = name ?? ""
    this.bio = bio ?? ""
}