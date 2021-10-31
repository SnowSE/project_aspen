import axios from "axios";
import event from "../Models/event"

const Url="api/events"

//Create
export const addEvent = async (event) =>{
    const res = await axios.post(Url, {...event})
    console.log(res)
    return res
}
//Read all
export const getEvents = async () => {
    const res = await axios.get(Url)
    return res.data;
}

//Read individual
export const getEvent = async (id) => {
    const res = await axios.get(Url + "/" + id)
    return res.data;
}
//Update
export const updateEvent = async (id, event) =>{
    const res = await axios.put(Url + "/"+ id, {...event})
}
//Delete
export const deleteEvent = async (id) => {
    const res = await axios.delete(Url + "/" + id)
    return res.data;
}

