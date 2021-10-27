export default function event(date, location, description, primaryImageUrl){
    this.date = date ?? null
    this.location= location ?? ""
    this.description = description ?? ""
    this.primaryImageUrl=primaryImageUrl ?? ""
}