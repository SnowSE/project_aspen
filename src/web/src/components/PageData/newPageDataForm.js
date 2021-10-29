import React from 'react'
import useInput from '../../hooks/use-input'
import TextInput from './Inputs/TextInput'

const newPageDataForm = () => {
    const newKeyName = useInput(value => value.trim() !== '')
    const newKeyHandler = (e) => {
        e.preventDefault()
        if(newKeyName.isValid)
        {
            const newKeyObject = {
                key: newKeyName,
                data: {}
            }
            console.log(newKeyObject)
            // handleNewPageDataCreation(newKeyObject)
        }
    }
    

    return (
        <form onSubmit={newKeyHandler}>
            <TextInput inputControl={newKeyName}/>
            <button className='btn btn-primary'>Save</button>
        </form>
    )
}

export default newPageDataForm
