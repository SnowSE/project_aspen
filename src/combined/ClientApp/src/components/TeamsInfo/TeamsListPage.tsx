import React, { useEffect, useState,useContext } from 'react';
import { TeamCard } from './Interfaces';
import { getTeamsList } from './TeamServices';
import { EventContext } from '../../App';


export function TeamsListPage() {
    const [teamsList, setTeams] = useState<typeof TeamCard[]>([]);
    const { currentEvent }  = useContext(EventContext);
       
    useEffect(() => {
        const fetchData = async () => {
            if (!currentEvent.id) {
                console.log("No current event found!")
                return;
            }
            const teams = await getTeamsList(currentEvent.id)
            setTeams(teams)
        }
        fetchData()
    }, [currentEvent])
    
    return (
        <div>
            <h1>Existing {teamsList.length} Teams  </h1>
            
            {teamsList.map((t: any, id) => {
                return (
                     <TeamCard
                        name={t.name}
                        id={t.id}
                        description={t.description}
                        mainImage={t.mainImage}
                        ownerID={t.ownerID}
                        eventID={t.eventID}
                        donationTarget={t.donationTarget}
                        isPublic={t.isPublic }
                        registrations={t.registrations }
                        key={t.id}

                    /> 

                )
            })}        
           
        </div>
    );
};