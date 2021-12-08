import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import TextInput from "../../inputs/TextInput";
import DateInput from "../../inputs/DateInput";
import EventModel from "../../models/event";
import { createNewEvent } from "../../store/eventSlice";
import { FormEvent } from "react";

const NewEventForm = () => {
  const dispatch = useDispatch();
  const title = useInput(
    "Title",
    "Title cannot be empty",
    (value) => value.trim() !== ""
  );
  const date = useInput(
    "Date",
    "Event must have a date",
    (value) => value.trim() !== ""
  );
  const description = useInput(
    "Description",
    "Description cannot be empty",
    (value) => value.trim() !== ""
  );
  const location = useInput(
    "Location",
    "Location cannot be empty",
    (value) => value.trim() !== ""
  );
  const image = useInput(
    "Image URL",
    "Image URL cannot be empty",
    (value) => value.trim() !== ""
  );

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (
      date.isValid &&
      location.isValid &&
      description.isValid &&
      image.isValid
    ) {
      const event = new EventModel(
        new Date(date.value),
        location.value,
        description.value,
        image.value
      );
      dispatch(createNewEvent(event));
      title.reset();
      date.reset();
      description.reset();
      location.reset();
      image.reset();
    }
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <DateInput inputControl={date} />
        <TextInput inputControl={location} />
        <TextInput inputControl={description} />
        <TextInput inputControl={image} />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewEventForm;
