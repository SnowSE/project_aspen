import { Box, Button, Card, CardHeader, CardMedia, CardContent, Typography, Divider, } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import Person from "../../JsModels/person";
import { authService } from "../../services/authService";
import ProgressBar from "../ProgressBar";
import axios from 'axios'
import { DonateButton } from "../DonateButton";
import DynamicModal from "../DynamicModal";
import { EventContext } from "../../App";
import Team from "../../JsModels/team";
import SharingIconTeams from "../Share/ShareIconTeams";


export function TeamDetails() {
    const baseImageUrl = process.env.PUBLIC_URL + "/assets/";
    const { currentEvent } = useContext(EventContext);

    const [searchParams] = useSearchParams();
    const list = []
    for (var entry of searchParams.entries()) {
        list.push(entry[1])
    }
    var tId = parseInt(list[0]);
    if (list[0] !== null) {
        tId = parseInt(list[0]);   // parse the string back to a number.
    }
    var ownerId = parseInt(list[1]);
    if (list[1] !== null) {
        ownerId = parseInt(list[1]);   // parse the string back to a number.
    }

    const accessToken = localStorage.getItem("access_token");

    const config = useMemo(() => {
        return {
            headers: { Authorization: `Bearer ${accessToken}` }
        };
    }, [accessToken]);


    const api = process.env.PUBLIC_URL + `/api/teams/${tId}`;
    const [currentTeam, setCurrentTeam] = useState<any>();
    const [teamOwner, setTeamOwner] = useState<Person>();
    const [loggedInUserId, setLoggedInUserId] = useState<number>();
    const [loggedInUserTeamId, setLoggedInUserTeamId] = useState<number>();
    const [isAdmin, setIsAdmin] = useState(false)
    const [isTeamOwner, setIsTeamOwner] = useState(false)
    const [openArchiveModal, setopenArchiveModal] = useState(false);
    const [openSwitchTeamsModal, setOpenSwitchTeamsModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [canSwitchTeam, setCanSwitchTeam] = useState<boolean>(true);
    const [onATeam, setOnATeam] = useState<boolean>(false);
    const [members, setMembers] = useState<Person[]>([]);
    const [isOkModal, setIsOkModal] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };


        const checkAllTeams = async () => {
            var teams = await axios.get(process.env.PUBLIC_URL + `/api/teams/event/${currentEvent.id}`, config)
            teams.data.forEach((team: Team) => {
                if (team.ownerID === loggedInUserId) {
                    console.log("This user is a team owner and cannot switch teams")
                    setCanSwitchTeam(false)
                }
            });
        }
        const checkIfOnTeam = async () => {
            try {
                var res = await axios.get(process.env.PUBLIC_URL + `/api/PersonTeamAssociation/${loggedInUserId}/${currentEvent?.id}`)
                if (res.status === 200) {
                    setCanSwitchTeam(true)
                    setOnATeam(true);
                    setLoggedInUserTeamId(res.data?.id)
                    setopenArchiveModal(false)
                }
                else {
                }
            }
            catch (e) {
            }
        }
        const fetchTeam = async () => {
            const res = await fetch(api)
            const response = await res.json()
            setCurrentTeam(response)

        }

        async function currentUser() {
            var user = await authService.getUser()
            user?.profile.roles.forEach((role: string) => {
                if (role.includes("admin")) {
                    setIsAdmin(true)
                }
            });
        }


        async function currentTeamMembers() {

            try {
                var memberApi = process.env.PUBLIC_URL + `/api/PersonTeamAssociation/team/${tId}`;
                const member = await fetch(memberApi)

                const teamMembers = await member.json()
                console.log("Team members", teamMembers);
                setMembers(teamMembers);

            } catch (e) { }


        }

        const getUser = async () => {
            await axios.get(process.env.PUBLIC_URL + '/api/user', config).then((response) => {
                setLoggedInUserId(response?.data?.id)
            }).catch((error) => {
                console.log("There was an error retrieving user", error)
            })
        }

        const fetchTeamOwner = async () => {
            try {
                var personApi = process.env.PUBLIC_URL + `/api/Person/${ownerId}`;
                const person = await fetch(personApi)
                const teamOwner = await person.json()
                if (currentTeam?.ownerID === loggedInUserId) {
                    setTeamOwner(teamOwner)
                    setIsTeamOwner(true)
                }

            } catch (e) {
            }
        }



        const callServise = async () => {
            await getUser();
            await fetchTeam();
            await fetchTeamOwner();
            await currentUser();
            await checkIfOnTeam();
            await checkAllTeams();
            await currentTeamMembers();
        };

        callServise();
    }, [api, ownerId, currentEvent, loggedInUserId, onATeam, tId, currentTeam?.ownerID]);

    const closeModal = () => {
        setopenArchiveModal(false)
        setOpenSwitchTeamsModal(false)
        setIsOkModal(false) 
        setOpenLoginModal(false)
        setMessage("")
    }

    const navigate = useNavigate();

    const handleArchive = async () => {
        currentTeam.isArchived = true
        const teamArchiveUrl = process.env.PUBLIC_URL + `/api/teams`;
        await axios.put(teamArchiveUrl, currentTeam, config);
        navigate('/')
        setopenArchiveModal(false)
    }

    const handleJoinTeam = async () => {
        loggedInUSer
            ? navigate({
                pathname: "/LoggedInUser",
                search: `?${createSearchParams({
                    teamId: `${tId}`,
                    userId: `${loggedInUserId}`,
                    canSwitchTeams: "false"
                })}`,
            })
            : authService.signinRedirect()
    }
    const handleSwitchTeams = async () => {
        try {
            var res = await axios.get(process.env.PUBLIC_URL + `/api/PersonTeamAssociation/${loggedInUserId}/${currentEvent?.id}`)
            if (res.status === 200) {
                setCanSwitchTeam(true)
                setOnATeam(true);
                setLoggedInUserTeamId(res.data?.id)
                loggedInUSer
                    ? navigate({
                        pathname: "/LoggedInUser",
                        search: `?${createSearchParams({
                            teamId: `${tId}`,
                            userId: `${loggedInUserId}`,
                            canSwitchTeams: "true",
                        })}`,
                    })
                    : authService.signinRedirect();
                setOpenSwitchTeamsModal(false)
            }
            else {
            }
        }
        catch (e) {
        }
    }


    /*console.log("Current team members", members?.name);*/
    const loggedInUSer = localStorage.getItem("LoggedInUser");
    return (
        <Box>
            <Box>
                <Typography variant="h1">{currentTeam?.name} </Typography>
                <Typography>Team owner: {teamOwner?.name}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                    {canSwitchTeam && loggedInUserTeamId !== tId && onATeam ?
                        (<Button
                            onClick={() => {
                                setOpenSwitchTeamsModal(true);
                                setMessage("Are you sure you want to switch teams to " + currentTeam?.name + "?")
                                
                            }
                            }
                            sx={{ backgroundColor: "orange", m: 2, fontSize: "10px", color: "white" }}
                        >
                            Switch Teams
                        </Button>)
                        : loggedInUserTeamId !== tId && canSwitchTeam ?
                            (<Button
                                onClick={() => {
                                    {loggedInUSer ?
                                        handleJoinTeam()
                                        : 
                                        setOpenLoginModal(true); setMessage("You have to login in order to join a team, would you like to register for an account?");
                                            
                                    }
                                }   
                                }
                                sx={{ backgroundColor: "orange", m: 2, fontSize: "10px", color: "white" }}
                            >
                                Join Our Team
                            </Button>)
                            :
                            !canSwitchTeam ? <></> : <></>}
                    <DynamicModal
                        open={openSwitchTeamsModal}
                        close={closeModal}
                        message={message}
                        onConfirm={handleSwitchTeams}
                        isOkConfirm={isOkModal}
                    />
                    <DynamicModal
                        open={openLoginModal}
                        close={closeModal}
                        message={message}
                        onConfirm={handleJoinTeam}
                        isOkConfirm={isOkModal}
                    />

                    {(() => {
                        if (loggedInUserId === currentTeam?.ownerID || isAdmin) {
                            return (

                                <Button
                                    onClick={() =>
                                        navigate({
                                            pathname: "/EditTeam",
                                            search: `?${createSearchParams({
                                                teamId: `${tId}`,
                                                userId: `${loggedInUserId}`,
                                            })}`,
                                        })

                                    }
                                    sx={{ backgroundColor: "orange", m: 2, fontSize: "10px", color: "white" }}
                                >
                                    Edit Team Details
                                </Button>

                            )
                        }
                    })()
                    }

                  {(() => {
                      if (loggedInUserId === currentTeam?.ownerID ||isAdmin) {
                          return (
                              
                                  <Button
                                      onClick={() => {setopenArchiveModal(true); setMessage("Are you sure you want to delete " + currentTeam?.name + "?") }}
                                      sx={{ backgroundColor: "red", m: 2, fontSize: "10px", color: "white" }}
                                  >
                                      Delete Team
                              </Button>
                          )
                      }
                  })()
                  }
              </Box>
              <Divider color="black"  sx={{ borderBottomWidth: 5, color: "black"}} />
          </Box>

            <Box sx={{ mt: 5 }}>
                <Box>
                    <CardMedia
                        component="img"
                        height="500"
                        width="500"
                        image={baseImageUrl + currentTeam?.mainImage}
                        alt="mainImage"
                    />
                </Box>
                <Typography variant="h4"> About us: </Typography>
                <Typography> {currentTeam?.description}</Typography>
                <Divider color="black" sx={{ borderBottomWidth: 5, color: "black", mt: 1, mb: 2 }} />
                <Typography >
                    {" "}
                    Donation Target: {currentTeam?.donationTarget} Dollars{" "}
                </Typography>
                <Box className="ProgressBarPosition">
                    <ProgressBar />
                    <Box className="ShareIconTeams">
                        <SharingIconTeams data-testid={"shareBtn"} />
                    </Box>
                </Box>
                <Box className="DonateButtonPosition">
                    <DonateButton />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <Card sx={{ maxWidth: 500 }}>
                    <CardHeader
                        className="PaperColor"
                        sx={{ color: "white" }}
                        title="Members: "
                    />

                    <CardContent>
                        {/*<Typography> Team Members will go here</Typography>*/}
                        <Typography alignItems="center">
                            <ul>
                                {members.map((j) => (
                                    <li key={j.id}>
                                        {(isAdmin || isTeamOwner) ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                //startIcon={<Delete />}
                                                //onClick={() => handleDelete(j.id)}
                                                size="small"
                                                style={{
                                                    backgroundColor: 'red',
                                                    color: 'white',
                                                    fontSize: '8px',
                                                    width: '5px',
                                                    height: '20px',
                                                    padding: '0',
                                                    margin: '5px',
                                                }}
                                            >
                                                X
                                                </Button>
                                              
                                        ) : null}
                                        {j.nickName}
                                    </li>
                                ))}
                            </ul>

                            
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <DynamicModal
                open={openArchiveModal}
                close={closeModal}
                message={message}
                onConfirm={handleArchive}
                isOkConfirm={isOkModal}
            />
        </Box>
    );
}
