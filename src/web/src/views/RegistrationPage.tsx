import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CreatePersonForm from '../components/Person/CreatePersonForm'
import { useStoreSelector } from '../store'
import { getPersonByAuthId } from '../store/personSlice'
const RegistrationPage = () => {
    
    const authId = useStoreSelector((state) => state.auth.user?.profile.email) ?? ""
    const selectedPerson= useStoreSelector((state)=> state.person.selectedPerson)
    const dispatch = useDispatch();

    console.log("here", selectedPerson)

    useEffect(()=>{
        dispatch(getPersonByAuthId(authId))
    },[authId, dispatch])
    return (
        <div>
            {selectedPerson ? 'exist' : <CreatePersonForm/>}
        </div>
    )
}

export default RegistrationPage
