import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CreatePersonForm from '../components/Person/CreatePersonForm'
import TeamForm from '../components/Team/TeamForm'
import { useStoreSelector } from '../store'
import { getPersonByAuthId } from '../store/personSlice'
const TeamRegistrationPage = () => {
    const authId = useStoreSelector((state) => state.auth.user?.profile.email) ?? "";
    const selectedPerson = useStoreSelector((state) => state.person.selectedPerson)
    const dispatch = useDispatch();

    console.log("here", selectedPerson)

    useEffect(() => {
        dispatch(getPersonByAuthId(authId));
    }, [authId, dispatch]);

    return (
        <div>
            {!selectedPerson ? <CreatePersonForm authId={authId}/> : <TeamForm ownerId={selectedPerson.id}/>}
        </div>
    )
}

export default TeamRegistrationPage
