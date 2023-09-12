import axios from "axios";
import Person from "../models/person";
const url = `${process.env.PUBLIC_URL}/api/Person`;

const getAllPersons = async () => {
  const res = await axios.get<Person[]>(url);
  return res.data;
};

const getPersonByAuthId = async (authId: string)=>{
  const res = await axios.get<Person>(url + "/authid/" + authId )
  return res.data;
}

const createPerson = async (person: Person) => {
  const res = await axios.post<Person>(url, { ...person });
  return res.data
};

const updatePerson = async (person: Person) => {
  const res = await axios.put<Person>(url + "/" + person.id, { ...person });
  return res.data
};

const deletePerson = async (id: number) => {
  await axios.delete(url + "/" + id);
};

const personService = {
  createPerson,
  getAllPersons,
  updatePerson,
  deletePerson,
  getPersonByAuthId
};

export default personService;
