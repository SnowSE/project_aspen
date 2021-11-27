import { FC, FormEvent } from "react";
import useInput from "../../hooks/use-input";
import TextInput from "../../inputs/TextInput";
import Person from "../../models/person";
import { useDispatch } from "react-redux";
import { createPerson } from "../../store/personSlice";

type Props = {
  authId?: string;
  given_name?: string;
}

const CreatePersonForm: FC<Props> = (props): JSX.Element => {
  const dispatch = useDispatch();
  const authId = useInput(
    "AuthId",
    "Please enter a valid AuthId.",
    (value) => value.trim() !== "",
    props.authId
  );
  const name = useInput(
    "Name",
    "Please enter a valid name.",
    (value) => value.trim() !== "",
    props.given_name
  );
  
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log("above");
    if (authId.isValid && name.isValid) {
      const person = new Person(authId.value, name.value, "");
      dispatch(createPerson(person));
      authId.reset();
      name.reset();
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <label>Create Person:</label>
      <TextInput inputControl={authId} />
      <TextInput inputControl={name} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreatePersonForm;