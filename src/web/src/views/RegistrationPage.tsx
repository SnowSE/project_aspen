import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CreatePersonForm from '../components/Person/CreatePersonForm'
import { useStoreSelector } from '../store'
import { getPersonByAuthId } from '../store/personSlice'
const RegistrationPage = () => {
    const [isPersonFetched, setIsPersonFetched] = useState(false);
    const authId = useStoreSelector((state) => state.auth.user?.profile.email) ?? "";
    const selectedPerson = useStoreSelector((state) => state.person.selectedPerson)
    const dispatch = useDispatch();

    console.log("here", selectedPerson)

    useEffect(() => {
        dispatch(getPersonByAuthId(authId));
        setIsPersonFetched(true);
    }, [authId, dispatch]);

    return (
        <div>
            {!selectedPerson ? <CreatePersonForm /> : <TeamForm />}
        </div>
    )
}

export default RegistrationPage
