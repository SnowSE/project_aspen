import React from 'react'
import { useSelector } from 'react-redux'

export default function Admin() {

    const user = useSelector((state) => state.auth.user)
    const isAdmin = useSelector((state) => state.auth.isAdmin)
    return (
        <div>
            <h1> Admin page</h1>
            <p>{JSON.stringify(user)}</p>
            <h2>Is Admin: {isAdmin.toString()}</h2>
        </div>
    )
}
