import React from "react";
import useInput from "../../hooks/use-input";
import TextInput from "../../Inputs/TextInput";

const NewPageDataForm = (props) => {
  const newKeyName = useInput(
    "Key",
    "Key cannot be empty",
    (value) => value.trim() !== ""
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (newKeyName.isValid) {
      const newKeyObject = {
        key: newKeyName.value,
        data: {},
      };
      
      props.onSubmit(newKeyObject);
      newKeyName.reset();
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <TextInput inputControl={newKeyName} />
      <button className="btn btn-primary">Save</button>
    </form>
  );
};

export default NewPageDataForm;
