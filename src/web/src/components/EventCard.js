const EventCard = (event) => {

    return(
        <>
            <h4>{event.date}</h4>
            <h4>{event.location}</h4>
            <p>{event.description}</p>
            <h4>{event.image}</h4>
          </>
    )

}

export default EventCard