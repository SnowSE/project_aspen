import axios from "axios";
import Person from "../models/person";
const url = "api/Person";

const getAllPersons = async () => {
  const res = await axios.get<Person[]>(url);
  return res.data;
};

const createPerson = async (person: Person) => {
  const res = await axios.post<Person>(url, { ...person });
  return res.data
};

const updatePerson = async (person: Person) => {
  const res = await axios.put<Person>(url + "/" + person.ID, { ...person });
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
};

export default personService;
