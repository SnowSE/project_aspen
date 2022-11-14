import { Button, Card, Grid } from '@mui/material';
import * as React from 'react';

type Team = {
    id: number,
    name: string, 
    description: string,
    mainImage: string,
    ownerID: string,
    owner: string,
    eventID: string,
    donationTarget: number,
};

export const TeamCard = ({ id, name, description, mainImage, ownerID, owner, eventID, donationTarget }: Team) => {
    return (
        <div style={{ paddingTop: "1rem", justifyContent: "flex-start" }}>
            <div className="d-flex justify-content-start" >
                <div>
                    <Card style={{ width: "30rem" }}>
                        <div className="card text-start" style={{ backgroundColor: 'purple'}}>
                            <div className="card-header" style={{ fontSize: '50px', color: 'white' }}>{name}

                                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right"}}>
                                    <Button sx={{ backgroundColor: 'yellowgreen', m: 2, fontSize: '10px', color: 'white' }}>Join Our Team</Button>
                                </Grid>                              
</div>
                        </div>

                    </Card>
                </div>
            </div>  
        </div>
        
        );
}