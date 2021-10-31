import axios from "axios"
import Person from "../Models/person"

const url="api/Person"

const getAllPersons = async () =>{
    const res = await axios.get(url)
    return res
}

const createPerson = async (Person) =>{
    const res = await axios.post(url, {...Person})
}

const updatePerson = async (id, Person) =>{
    const res = await axios.put(url+"/"+id, {...Person})
}

const deletePerson = async (id) =>{
    const res = await axios.delete(url+"/"+id)
    return res
}

const personService ={
    createPerson,
    getAllPersons,
    updatePerson,
    deletePerson,
};

export default personService;