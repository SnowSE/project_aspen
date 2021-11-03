import React, { FormEvent } from "react";
import useInput from "../../hooks/use-input";
import TextInput from "../../inputs/TextInput";
import { PageData } from "../../models/pageData";

interface Props {
  onSubmit: (newKeyObject: PageData ) => void;
}
const NewPageDataForm = ({ onSubmit }: Props) => {
  const newKeyName = useInput(
    "Key",
    "Key cannot be empty",
    (value) => value.trim() !== ""
  );

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (newKeyName.isValid) {
      const newKeyObject: PageData = {
        key: newKeyName.value,
        data: {},
      };

      onSubmit(newKeyObject);
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
