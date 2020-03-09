import * as React from 'react';
import Description from './Description';

interface TeamPageProps{

}

const TeamPage:React.FC<TeamPageProps> = props =>{
    return(
        <React.Fragment>
            <Description/>
        </React.Fragment>
    );
}

export default TeamPage;