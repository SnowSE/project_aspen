import React, { useState, useEffect } from 'react';

import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import theme from "../../theme";

import { Team } from '../../models/TeamModel';

import { APIService } from '../../services/APIService';
import { DomainService } from "../../services/DomainService";
import { LoggerService } from "../../services/LoggerService";

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            display: "flex",
            flexWrap: "wrap",
            width: 400,
            margin: `${theme.spacing(0)} auto`
        },
        submitBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1,
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
                background: theme.palette.primary.light
            }
        },
        header: {
            textAlign: "center",
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        },
        card: {
            marginTop: theme.spacing(15)
        },
        background: {
            background: "#e5e5e5",
            height: "100vh"
        }
    })
);



interface CreateTeamProps {}

const CreateTeam: React.FC<CreateTeamProps> = props => {
    const classes = useStyles();
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    
    const apiService = new APIService(new DomainService(), new LoggerService());

    useEffect(() => {
        if (teamName.trim() && teamDescription.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [teamName, teamDescription]);

    const handleSubmit = async () => {
        const team = new Team(teamName, teamDescription);
        const charity = await apiService.GetCharityByDomain()
        apiService.PostCreateTeam(team, charity.ID);
    }

    const handleKeyPress = (e: any) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleSubmit();
          }
    }

    return (
        <React.Fragment>
            <div className={classes.background}>
                <form className={classes.container} noValidate autoComplete="off">
                    <Card className={classes.card}>
                        <CardHeader className={classes.header} title="Create a Team"  />
                        <CardContent>
                            <div>
                                <TextField 
                                     fullWidth 
                                     id="teamName" 
                                     type="text" 
                                     label="Team Name" 
                                     placeholder="Team Name"
                                     margin="normal"
                                     onChange={e => setTeamName(e.target.value)}
                                     onKeyPress={e => handleKeyPress(e)}
                                 />

                                <TextField
                                    fullWidth
                                    multiline 
                                    rows="6"
                                    id="teamDescription" 
                                    type="textarea" 
                                    label="Team Description" 
                                    placeholder="Team Desciption"
                                    margin="normal"
                                    onChange={e => setTeamDescription(e.target.value)}
                                 onKeyPress={e => handleKeyPress(e)}
                                 />         
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button 
                              variant="contained"
                              size="large"
                              className={classes.submitBtn}
                              onClick={() => handleSubmit()}
                              disabled={isButtonDisabled}
                            >
                                Submit
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </div>
        </React.Fragment >
    )

}

export default CreateTeam;