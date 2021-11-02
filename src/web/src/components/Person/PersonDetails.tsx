import React from "react";
import { deletePerson } from "../../store/personSlice";
import { useSelector, useDispatch } from "react-redux";
import Person from "../../models/person";

export default function PersonDetails({ person }: {person: Person}) {
  const dispatch = useDispatch();
  function onDelete() {
      dispatch(deletePerson(person.ID))
  }
  return (
    <div>
      <p>id: {person.ID}</p>
      <p>AuthId: {person.authID}</p>
      <p>Name: {person.name}</p>
      <p>Bio: {person.bio}</p>
      <button onClick={onDelete}> Delete person. </button>
    </div>
  );
}
