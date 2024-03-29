import { Box, Button, Card, CardHeader, CardMedia, CardContent, Typography, Divider, } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import Person from "../../JsModels/person";
import { authService } from "../../services/authService";
import axios from 'axios'
import { DonateButton } from "../DonateButton";
import DynamicModal from "../DynamicModal";
import { EventContext } from "../../App";
import Team from "../../JsModels/team";
import SharingButtonCustomLink from "../Share/SharingButtonCustomLink";
import BlackTextProgressBar from "../BlackTextProgressBar";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


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
    const personApi = process.env.PUBLIC_URL + `/api/Person/${ownerId}`;
    const [currentTeam, setCurrentTeam] = useState<any>();
    const [loggedInUserId, setLoggedInUserId] = useState<number>();
    const [loggedInUserTeamId, setLoggedInUserTeamId] = useState<number>();

    const [isAdmin, setIsAdmin] = useState(false)
    const [openArchiveModal, setopenArchiveModal] = useState(false);
    const [openDeleteModal, setopenDeleteModal] = useState(false);
    const [openSwitchTeamsModal, setOpenSwitchTeamsModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [openZeroPersonModal, setOpenZeroPersonModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [canSwitchTeam, setCanSwitchTeam] = useState<boolean>(true);
    const [onATeam, setOnATeam] = useState<boolean>(false);
    const [members, setMembers] = useState<Person[]>([]);
    const [isOkModal, setIsOkModal] = useState(false);
    const [message, setMessage] = useState("");
    const [deleteUserId, setDeleteUserId] = useState(0);
    const [donationTotal, setdonationTotal] = useState<number>(0.0);
    const [progressBarIsUptodate, setprogressBarIsUptodate] = useState<boolean>(false);

    const [previousTeam, setpreviousTeam] = useState<Team>();    
    const [teamOwner, setteamOwner] = useState<Person>();

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };

        const checkAllTeams = async () => {
            var teams = await axios.get(process.env.PUBLIC_URL + `/api/teams/event/${currentEvent?.id}`, config)
            teams.data.forEach((team: Team) => {
                if (team.ownerID === loggedInUserId) {
                    setCanSwitchTeam(false)
                }
            });
        }

        async function PreviousTeamInfo() {

            if(loggedInUserId!= null){

                var res = await axios.get(process.env.PUBLIC_URL + `/api/PersonTeamAssociation/${loggedInUserId}/${currentEvent?.id}`)
                if (res.status === 200) {
                    console.log("previous team name", res.data?.name)
                    setpreviousTeam(res.data)
                }
            }


        }

        async function currentTeamMembers() {

            try {
                var memberApi = process.env.PUBLIC_URL + `/api/PersonTeamAssociation/team/${tId}`;
                await fetch(memberApi)
                    .then(response => response.json())
                    .then(teamMembers => {
                        setMembers(teamMembers);
                    })


            } catch (e) { }
        }

        const getDonationTotal = (async () => {
            if(currentTeam?.id != null){

                if (currentEvent?.id === undefined) {
                    return;
                }
                const response = await axios.get(`api/donations/team/${currentTeam?.id}`);
                const data = response.data;
                setdonationTotal(data);
                setprogressBarIsUptodate(true);
                
            }
            
        });
        
        const checkIfOnTeam = async () => {
            if(loggedInUserId!= null){

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
        



        const getUser = async () => {
            await axios.get(process.env.PUBLIC_URL + '/api/user', config).then((response) => {
                setLoggedInUserId(response?.data?.id)
            }).catch((error) => {
                console.log("There was an error retrieving user", error)
            })

        }

        const callServise = async () => {
            await getUser();
            await fetchTeam();
            await currentUser();
            await checkIfOnTeam();
            await checkAllTeams();
            await currentTeamMembers();
            await getDonationTotal();
            await PreviousTeamInfo();
        };
if(currentEvent?.id != null){

    callServise();
}

        if (deleteUserId === currentTeam?.ownerID && members.length > 1) {
            setOpenErrorModal(true);
            setOpenZeroPersonModal(false);
        } else if (members.length === 1 && deleteUserId === currentTeam?.ownerID) {
            setOpenErrorModal(false);
            setOpenZeroPersonModal(true);
        } else {
            setOpenErrorModal(false);
            setOpenZeroPersonModal(false);
        }


    }, [api, ownerId, currentEvent, loggedInUserId, tId, currentTeam?.ownerID, deleteUserId, members.length, currentEvent?.id, currentTeam?.id]);

    useEffect(() => {
        async function fetchTeamOwner() {

            var perRes = await axios.get(personApi, config);           
            var personResponse = perRes.data;     
            setteamOwner(personResponse);  
           
        }


        const callServise = async () => {
            await fetchTeamOwner();
        };

        callServise();
    }, [personApi, config]);





    const closeModal = () => {
        setopenArchiveModal(false)
        setOpenSwitchTeamsModal(false)
        setopenDeleteModal(false)
        setOpenErrorModal(false)
        setIsOkModal(false)
        setDeleteUserId(0)
        setIsOkModal(false)
        setOpenLoginModal(false)
        setMessage("")
    }

    const navigate = useNavigate();

    const handleArchive = async () => {
        currentTeam.isArchived = true
        const teamArchiveUrl = process.env.PUBLIC_URL + `/api/teams`;
        await axios.put(teamArchiveUrl, currentTeam, config);
        setopenArchiveModal(false)
        navigate({ pathname: "/" })
    }

    const handleDeleteUser = async () => {
        try {
            if (members.length === 1) {
                console.log("Shouldn't get here, trying to delete team owner and make a (zero)person team")
                return;
            }
            else {
                const deleteUser = process.env.PUBLIC_URL + `/api/PersonTeamAssociation/${deleteUserId}/${currentEvent?.id}`;
                await axios.delete(deleteUser, config);
                setopenDeleteModal(false)
                reloadPage();
            }
        } catch (e) {

        }
    }

    const reloadPage = () => {
        navigate({
            pathname: "/TeamDetails",
            search: `?${createSearchParams({
                teamId: `${currentTeam?.id}`,
                ownerID: `${currentTeam?.ownerID}`,
            })}`
        })
    };

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
            console.log("Logged In user id: ", loggedInUserId, "current event id: ", currentEvent?.id);
            if (res.status === 200) {
                setCanSwitchTeam(true)
                setOnATeam(true);
                setLoggedInUserTeamId(res.data?.id)
                console.log("previous team name", res.data?.name )
                setpreviousTeam(res.data?.name)
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

    const loggedInUSer = localStorage.getItem("LoggedInUser");
    return (
        <Box>
            <Box>
                <Box>
                    <Button
                        onClick={() => navigate("/TeamsListPage")}
                    >
                        <KeyboardBackspaceIcon className="BackToTeamsListButton" />
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h1">{currentTeam?.name} </Typography>
                    {
                        <SharingButtonCustomLink
                            defaultMessage="Come join my team and help us reach our goal"
                            defaultSubject="Come Join My Team" />
                    }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                    {canSwitchTeam && loggedInUserTeamId !== tId && onATeam ?
                        (<Button
                            onClick={() => {
                                setOpenSwitchTeamsModal(true);
                                setMessage("Are you sure you want to switch teams to " + currentTeam?.name + " from " +  previousTeam?.name +"?")
                            }
                            }
                            className="SwitchTeamsButton"
                        >
                            Switch Teams
                        </Button>)
                        : loggedInUserTeamId !== tId && canSwitchTeam ?
                            (<Button
                                onClick={() => {
                                    loggedInUSer ?
                                        handleJoinTeam()
                                        :
                                        setOpenLoginModal(true);
                                    setMessage("You have to login in order to join a team, would you like to register for an account?");
                                }
                                }
                                className="JoinATeamButton"
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
                                    className="EditATeamButton"
                                >
                                    Edit Team Details
                                </Button>
                            )
                        }
                    })()
                    }
                    {(() => {
                        if (loggedInUserId === currentTeam?.ownerID || isAdmin) {
                            return (
                                <Button
                                    onClick={() => { setopenArchiveModal(true); setMessage("Are you sure you want to delete " + currentTeam?.name + "?") }}
                                    className="DeleteTeamButton"
                                >
                                    Delete Team
                                </Button>
                            )
                        }
                    })()
                    }
                </Box>
                <Divider className="TeamDivider" />
            </Box>

            <Box sx={{ mt: 5 }}>
                <Box>
                    <CardMedia
                        component="img"
                        height="500"
                        width="500"
                        image={currentTeam?.mainImage ? baseImageUrl + currentTeam?.mainImage : ""}
                        alt="mainImage"
                    />
                </Box>
                <Typography variant="h4"> About us: </Typography>
                <Typography> {currentTeam?.description}</Typography>
                <Divider className="TeamDivider" />
                <Box className="ProgressBarPosition">
                    {progressBarIsUptodate && (
                        <BlackTextProgressBar currentTotal={donationTotal} goalTotal={currentTeam?.donationTarget}/>
                    )}
                </Box>
                <Box className="ShareIcon">
                </Box>
                <Box className="DonateButtonPosition">
                    <DonateButton />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <Card sx={{ maxWidth: 500 }}>
                    <CardHeader
                        className="MembersBox"
                        title="Members: "
                    />

                    <CardContent>
                            <ul>
                                {members.map((j: any) => (
                                    <li key={j.id}>
                                        {(isAdmin || loggedInUserId === currentTeam?.ownerID) ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => { setopenDeleteModal(true); setDeleteUserId(j.id); setMessage("Are you sure you want to remove memeber " + j.name + " from your team?") }}
                                                size="small"
                                                className="DeleteMembersButton"
                                            >
                                                X
                                            </Button>
                                        ) : null}
                                        {j.id === teamOwner?.id ? (
                                            <p>Team owner: <span style={{ color: 'red' }}>{teamOwner?.name}</span></p>
                                        ) : (
                                            <span>{j.nickname}</span>
                                        )}

                                        {
                                            <DynamicModal
                                                open={openErrorModal}
                                                close={closeModal}
                                                message={"You cannot delete the team owner if there are other members on the team"}
                                                onConfirm={closeModal}
                                                isOkConfirm={true}
                                            />
                                        }
                                        {
                                            <DynamicModal
                                                open={openZeroPersonModal}
                                                close={closeModal}
                                                message={"A (zero)person team is not allowed. If you want to delete the team, use DELETE TEAM button on this page."}
                                                onConfirm={closeModal}
                                                isOkConfirm={true}
                                            />
                                        }
                                        {
                                            !openErrorModal && !openZeroPersonModal && (
                                                <DynamicModal
                                                    open={openDeleteModal}
                                                    close={closeModal}
                                                    message={message}
                                                    onConfirm={() => handleDeleteUser()}
                                                    isOkConfirm={isOkModal}
                                                />
                                            )
                                        }
                                    </li>
                                ))}
                            </ul>
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
