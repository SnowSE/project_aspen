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
      <div className="mt-2 w-50 d-inline-block">
        <TextInput inputControl={newKeyName} />
      </div>      
      <button className="btn btn-primary btn-sm ms-2">Save</button>
    </form>
  );
};

export default NewPageDataForm;
