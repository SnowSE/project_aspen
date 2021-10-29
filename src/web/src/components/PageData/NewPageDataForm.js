import React from "react";
import useInput from "../../hooks/use-input";
import TextInput from "../../Inputs/TextInput";

const NewPageDataForm = () => {
  const newKeyName = useInput(
    "Key",
    "Key cannot be empty",
    (value) => value.trim() !== ""
  );
  const name = useInput("name", "name cannot be empty",  (value) => value.trim() !== "" )

  const newKeyHandler = (e) => {
    e.preventDefault();
    if (newKeyName.isValid) {
      const newKeyObject = {
        key: newKeyName.value,
        data: {},
      };
      console.log(newKeyObject);
      newKeyName.reset();
      // handleNewPageDataCreation(newKeyObject)
    }
  };

  return (
    <form onSubmit={newKeyHandler}>
      <TextInput inputControl={newKeyName} />
      <TextInput inputControl={name}/>
      <button className="btn btn-primary">Save</button>
    </form>
  );
};

export default NewPageDataForm;
