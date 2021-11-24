import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CreatePersonForm from '../components/Person/CreatePersonForm'
import JoinTeam from '../components/Team/JoinTeam'
import { useStoreSelector } from '../store'
import { getPersonByAuthId } from '../store/personSlice'
const JoinTeamPage = () => {
    const authId = useStoreSelector((state) => state.auth.user?.profile.email) ?? "";
    const selectedPerson = useStoreSelector((state) => state.person.selectedPerson);
    const currentEventId = useStoreSelector((state) => state.event.currentEventId);
    const dispatch = useDispatch();

    console.log("here", selectedPerson)

    useEffect(() => {
        dispatch(getPersonByAuthId(authId));
    }, [authId, dispatch]);

    return (
        <div>
            {!selectedPerson ? <CreatePersonForm authId={authId}/> : 
            <JoinTeam ownerId={selectedPerson.id} eventId={currentEventId}/>}
        </div>
    )
}

export default JoinTeamPage