import React from "react";
import useInput from "../../hooks/use-input";
import TextInput from "./Inputs/TextInput";

const NewPageDataForm = () => {
  const newKeyName = useInput(
    "Key",
    "Key cannot be empty",
    (value) => value.trim() !== ""
  );
  const newKeyHandler = (e) => {
    e.preventDefault();
    if (newKeyName.isValid) {
      const newKeyObject = {
        key: newKeyName.value,
        data: {},
      };
      console.log(newKeyObject);
      // handleNewPageDataCreation(newKeyObject)
    }
  };

  return (
    <form onSubmit={newKeyHandler}>
      <TextInput inputControl={newKeyName} />
      <button className="btn btn-primary">Save</button>
    </form>
  );
};

export default NewPageDataForm;
