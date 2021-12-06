import axios from "axios";
import Registration from "../models/registration";
;
const registrationUrl = `${process.env.PUBLIC_URL}/api/Registration`

const createRegistration = async (registration: Registration) => {
    const res = await axios.post<Registration>( registrationUrl, registration)
    return res.data
}

const registrationService={
    createRegistration
}

export default registrationService;