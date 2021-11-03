import React from 'react'
import { useStoreSelector } from '../store'

export default function Admin() {
    const user = useStoreSelector((state) => state.auth.user)
    const isAdmin = useStoreSelector((state) => state.auth.isAdmin)
    return (
        <div>
            <h1> Admin page</h1>
            <p>{JSON.stringify(user)}</p>
            <h2>Is Admin: {isAdmin.toString()}</h2>
        </div>
    )
}
