import React, { useEffect, useState,useContext } from 'react';
import { TeamCard } from './Interfaces';
import { getTeamsList } from './TeamServices';
import { EventContext } from '../../App';
import Team from '../../JsModels/team';


export function TeamsListPage() {
    const [teamsList, setTeams] = useState<typeof Team[]>([]);
    const { currentEvent }  = useContext(EventContext);
    console.log(currentEvent)
       
    useEffect(() => {
        const fetchData = async () => {
            if (!currentEvent?.id) {
                return;
            }
            const teams = await getTeamsList(currentEvent?.id)
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
                        persons={t.persons}
                        isArchived={t.isArchived}
                        WelcomeMessage={t.WelcomeMessage}
                        key={t.id}

                    /> 

                )
            })}        
           
        </div>
    );
};