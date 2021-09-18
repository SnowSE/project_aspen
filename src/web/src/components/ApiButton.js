import axios from 'axios'
import { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../store/AuthContext'


const ApiButton = () => {
  const [apiResponse, setApiResponse] = useState()
  const authContext = useContext(AuthContext)

  const getUserCallback = useCallback(() => {
    authContext.getUser().then(u => {
      console.log(u)
      const options = {
        headers: {
          Authorization: `Bearer ${u.access_token}`
        }
      }
      console.log(options)
      axios.get('/api/user', options)
        .then(response => {
          console.log('got response from api', response)
          setApiResponse(response.data)
        })
        .catch(e => {
          console.log('error from api', e)
        })
    })
  }, [authContext])

  return (
    <div>
      <button className="btn btn-primary" onClick={getUserCallback}>Send API Request</button>
      {apiResponse && <div>Api Response: {JSON.stringify(apiResponse)}</div>}
    </div>
  )
}

export { ApiButton }