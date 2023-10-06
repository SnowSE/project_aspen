import React from "react";
import { deletePerson } from "../../store/personSlice";
import { useDispatch } from "react-redux";
import Person from "../../models/person";

export default function PersonDetails({ person }: {person: Person}) {
  const dispatch = useDispatch();
  function onDelete() {
      dispatch(deletePerson(person.id))
  }
  return (
    <div>
      <p>id: {person.id}</p>
      <p>AuthId: {person.authID}</p>
      <p>Name: {person.name}</p>
      <p>Bio: {person.bio}</p>
      <button onClick={onDelete}> Delete person. </button>
    </div>
  );
}
