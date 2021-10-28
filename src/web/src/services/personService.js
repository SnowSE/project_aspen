import axios from "axios"
import person from "../Models/person"

const url="api/Person"

const getPeople = async () =>{
    const res = await axios.get(url)
    return res
}

const addPerson = async (person) =>{
    const res = await axios.post(url, {...person})
}

const updatePerson = async (id, person) =>{
    const res = await axios.put(url+"/"+id, {...person})
}

const deletePerson = async (id) =>{
    const res = await axios.delete(url+"/"+id)
    return res
}