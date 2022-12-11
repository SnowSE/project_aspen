import Registration from "../../JsModels/registration";

export const getRegistrationList = async (id: number) => {

    const apiUrL = process.env.PUBLIC_URL + `/api/Person/${id}/registrations`;    const res = await fetch(apiUrL)
    const resp = await fetch(apiUrL)
    const response = await resp.json()
    const otherArray: Registration[] = response
    console.log("Other array in registrasin service", otherArray);
    return otherArray
}