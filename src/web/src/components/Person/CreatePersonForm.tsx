import React, { FormEvent, SyntheticEvent } from "react";
import useInput from "../../hooks/use-input";
import TextInput from "../../inputs/TextInput";
import Person from "../../models/person";
import { useDispatch } from "react-redux";
import { createPerson } from "../../store/personSlice";

export default function CreatePersonForm() {
  const dispatch = useDispatch();
  const authId = useInput(
    "AuthId",
    "Please enter a valid AuthId.",
    (value) => value.trim() !== ""
  );
  const name = useInput(
    "Name",
    "Please enter a valid name.",
    (value) => value.trim() !== ""
  );
  const bio = useInput(
    "Bio",
    "Please enter a valid bio.",
    (value) => value.trim() !== ""
  );
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log("above");
    if (authId.isValid && name.isValid && bio.isValid) {
      const person = new Person(authId.value, name.value, bio.value);
      dispatch(createPerson(person));
      authId.reset();
      name.reset();
      bio.reset();
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <label>Create Person:</label>
      <TextInput inputControl={authId} />
      <TextInput inputControl={name} />
      <TextInput inputControl={bio} />
      <button type="submit">Submit</button>
    </form>
  );
}
