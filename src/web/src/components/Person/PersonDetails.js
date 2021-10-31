import React from "react";
import { deletePerson } from "../../store/PersonSlice";
import { useSelector, useDispatch } from "react-redux";

export default function PersonDetails({ person }) {
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
