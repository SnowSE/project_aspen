import { createContext, useContext, useEffect, useState } from "react";
import { TeamCard } from "./Interfaces";

//const APIcontext = createContext();

//export function Provider() {

//    const [teams, setTeams] = useState([]);
//    const [currentTeam, setCurrentTeam] = useState(null)
//    const apiUrL = 'https://localhost:44478/aspen/new/api/teams/event/1';

//    useEffect(() => {

//        const fetchPlayers = async () => {

//            try {
//                const res = await await fetch(apiUrL);
//                const response = await res.json()
//                const otherArray: typeof TeamCard[] = response
//                return otherArray
//                setTeams(otherArray)

//            }

//            catch (err) {

//                if (err.response) {
//                    console.log(err.response.data)
//                } else {

//                    console.log(`Error: ${err.message}`)
//                }

//            }
//        }

//        fetchPlayers()
//    }, [])


//    const UpdateDetails = () => {


//    }
//    return (
//        <APIcontext.Provider value={{ teams, currentTeam, UpdateDetails }}></APIcontext.Provider>
//    )
//}



//export default APIcontext;