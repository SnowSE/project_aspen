
function NewEventForm(props){
    return(
        <div>
            <form>
                <label>Date</label>
                <input type="date" ></input>
                <label>Location</label>
                <input type="text"></input>
                <label>Description</label>
                <input type="text"></input>
                <label>Image</label>
                <input type="text"></input>
            </form>
        </div>
    );
}

export default NewEventForm;