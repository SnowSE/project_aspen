import { useDispatch } from "react-redux"
import  useInput  from "../../hooks/use-input";
import  TextInput  from "../../Inputs/TextInput"
import  DateInput  from "../../Inputs/DateInput"
import Event from "../../Models/event"
import { createNewEvent, updateExistingEvent } from "../../store/EventSlice";
import { updateEvent } from "../../services/eventApiService";

const NewEventForm = (event, isEditing) =>{
    const dispatch = useDispatch();
    const date = useInput("Date", "Event must have a date", (value)=>value.trim() !== "")
    const description = useInput("Description", "Description cannot be empty", (value)=>value.trim() !== "")
    const location = useInput("Location", "Location cannot be empty", (value)=>value.trim() !== "")
    const image = useInput("Image URL", "Image URL cannot be empty", (value)=>value.trim() !== "")

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        console.log("above")
        if(date.isValid && location.isValid && description.isValid && image.isValid){
            const event = new Event(date.value, location.value, description.value, image.value)
            console.log(event)
            if(isEditing){
                dispatch(updateExistingEvent(event))
            }
            else{
                dispatch(createNewEvent(event))
            }
            
            date.reset();
            description.reset();
            location.reset();
            image.reset();
        }
        

    }
    return(
        <div>
            <form onSubmit={onSubmitHandler}>
                <DateInput inputControl={date} placeholder={event.date}/>
                <TextInput inputControl={location} placeholder={event.location}/>
                <TextInput inputControl={description} placeholder={event.description}/>
                <TextInput inputControl={image} placeholder={event.image}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NewEventForm;