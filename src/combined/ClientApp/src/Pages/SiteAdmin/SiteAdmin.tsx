import { Accordion, AccordionSummary, Box, Button, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, AccordionDetails } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../../App";
import EventEditDeleteForm from "../../components/AdminComponents/EventEditDeleteForm";
import TeamMembersListAccordian from "../../components/AdminComponents/TeamMembersListAccordian";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getTeamsList } from "../../components/TeamsInfo/TeamServices";
import Team from "../../JsModels/team";
import PaymentFailure from "../../JsModels/paymentFailure";
import { authService } from "../../services/authService";
import DynamicModal from "../../components/DynamicModal";
import axios from "axios";
import BlackTextProgressBar from "../../components/BlackTextProgressBar";
import ProgressBar from "../../components/ProgressBar";



const SiteAdmin = () => {
    const { currentEvent } = useContext(EventContext);
    const [teamsList, setTeams] = useState<Team[]>();
    const [teamDonations, setTeamDonations] = useState<Map<number, number>>(new Map());
    const [stripeFailureLogs, setStripeFailureLogs] = useState<PaymentFailure[]>();
    const [showEditEvent, setShowEditEvent] = useState(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [totalDonations, setTotalDonations] = useState<number>(0);
    const [message, setMessage] = useState("");
    const [openArchiveModal, setopenArchiveModal] = useState(false);
    const [isOkModal, setIsOkModal] = useState(false);
    const navigate = useNavigate();
    const [donationsTotal, setdonationsTotal] = useState<number>(0.0);
    const [progressBarIsUptodate, setprogressBarIsUptodate] = useState<boolean>(false);
    const [archriveTeam, setarchriveTeam] = useState<Team>();



    const accessToken = localStorage.getItem("access_token");

    const config = useMemo(() => {
        return {
            headers: { Authorization: `Bearer ${accessToken}` }
        };
    }, [accessToken]);

    const getDonationTotal = useCallback(async () => {
        try {
            if (currentEvent?.id === undefined) {
                return;
            }
            const response = await axios.get(`api/donations/event/${currentEvent?.id}`);
            const data = response.data;
            setdonationsTotal(data);
            setprogressBarIsUptodate(true);

        } catch (e) {

        }
    }, [currentEvent?.id, setdonationsTotal]);



    useEffect(() => {
        getDonationTotal();
        const fetchData = async () => {
            if (currentEvent?.id !== -1) {
                const paymentFailures = process.env.PUBLIC_URL + `/api/stripe/failures`;
                const allDonations = process.env.PUBLIC_URL + `/api/donations/totalDonations`;
                var donationCount = await fetch(allDonations)
                var stripeDBLogs = await fetch(paymentFailures, { headers: config.headers })
                const donations = await donationCount.json();
                const stripeFailures: PaymentFailure[] = await stripeDBLogs.json()
                var teamsList = await getTeamsList(currentEvent.id)
                var jsonTeams: Team[] = JSON.parse(JSON.stringify(teamsList));

                setTotalDonations(donations);
                setStripeFailureLogs(stripeFailures)
                setTeams(jsonTeams)
            }
        }
        fetchData()
    }, [currentEvent, getDonationTotal, config.headers]);

   
    useEffect(() => {

        async function currentUser() {
            var user = await authService.getUser()
            user?.profile.roles.forEach((role: string) => {
                if (role.includes("admin")) {
                    setIsAdmin(true)
                }
            });
        }

        
        
        const donationTotalPerTeam = async () => {
            const teamDonationsMap = new Map<number, number>();
            if (teamsList !== undefined) {
                for (const team of teamsList) {
                    if (team.id !== undefined) {
                        const donationTotal = await getTeamDonationTotal(team.id);
                        teamDonationsMap.set(team.id, donationTotal);
                    }
                }
                setTeamDonations(teamDonationsMap);
            }
        };

        const getTeamDonationTotal = async (teamId: number) => {
            try {
                if (currentEvent?.id === undefined) {
                    return;
                }
                const response = await axios.get(`api/donations/team/${teamId}`);
                const data = response.data;
                return data;

            } catch (e) {
                // Handle error if needed
            }
        };

        currentUser()
        donationTotalPerTeam()

    }, [currentEvent, totalDonations, teamsList])

    const archiveTeam = async (team?: Team) => {
        if (team !== undefined) {
            team.isArchived = true;
            const teamArchiveUrl = process.env.PUBLIC_URL + `/api/teams`;
            await axios.put(teamArchiveUrl, team, config);
        }
    }

    const closeModal = () => {
        setopenArchiveModal(false)
        setIsOkModal(false)
        setMessage("")
    }

    return (
        <Box>

            {isAdmin ?
                <div>
                    <Paper square={true} elevation={6} className="AdminPaperDetails">
                        <Box className="ProgressBarPosition" sx={{mb: 1} }>
                            {progressBarIsUptodate && (
                                <ProgressBar currentTotal={donationsTotal} goalTotal={currentEvent?.donationTarget} />
                            )}
                        </Box>

                        <Box className="AdminCurrentEventDetails">

                            {
                                showEditEvent === true ? <Typography className="AdminCurrentEventTextDetails"> Current Event: {currentEvent?.isArchived ? "" : currentEvent?.title}</Typography> : <EventEditDeleteForm />
                            }

                            {currentEvent?.isArchived || currentEvent?.id === -1 ?

                                <Button type='button' variant='contained' className="AdminButtonDetails" onClick={() => navigate('/createEvent')}>
                                    {
                                        "Add"
                                    }
                                </Button>
                                :
                                <div>

                                    <Button type='button' variant='contained' className="AdminButtonDetails" onClick={() => setShowEditEvent((prevState) => !prevState)}>
                                        {
                                            showEditEvent === true ? "Edit" : "Close"
                                        }
                                    </Button>

                                    <Button type='button' variant='contained' className="AdminButtonDetails" onClick={() => navigate('/createEvent')}>
                                        {
                                            "Add"
                                        }
                                    </Button>
                                </div>
                            }
                        </Box>
                    </Paper>
                    <Accordion className="AccordionSpacing">
                        <AccordionSummary
                            className="AccordionDetails"
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography> Teams </Typography>
                        </AccordionSummary>
                        {teamsList?.filter((t: Team) => t.isArchived === false).map((t: Team, id) => {
                            return (
                                <Accordion className="InnerAccordionSpacing">
                                    <AccordionSummary
                                        className="InnerAccordionDetails"
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        
                                            <BlackTextProgressBar currentTotal={teamDonations.get(t.id || 0) || 0} goalTotal={t.donationTarget} />
                                        <Typography sx={{ marginLeft: '5rem', justifyContent: 'flex', fontSize: '20px'} }>
                                            <b>{t.name}</b>
                                        </Typography>
                                        
                                        <Box className="TeamsSpacing">
                                            <Button
                                                variant="contained"
                                                className="UpdateTeamButtonDetails"
                                                type="submit"
                                            >Update
                                            </Button>
                                            <Button
                                                variant="contained"
                                                className="DeleteTeamButtonDetails"
                                                type="button"
                                                onClick={() => { setarchriveTeam(t); setMessage("Are you sure you want to delete " + t.name + "?"); setopenArchiveModal(true); }}
                                            > Delete
                                            </Button>
                                            <DynamicModal
                                                open={openArchiveModal}
                                                close={closeModal}
                                                message={message}
                                                onConfirm={() => archiveTeam(archriveTeam)}
                                                isOkConfirm={isOkModal}
                                            />
                                        </Box>
                                    </AccordionSummary>
                                    <TeamMembersListAccordian />
                                </Accordion>
                            )
                        })}
                    </Accordion>
                    <Accordion className="AccordionSpacing">
                        <AccordionSummary
                            className="AccordionDetails"
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography> Stripe Error Logs | {stripeFailureLogs?.length} Failures / {totalDonations} Successes </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Stripe Failure Name </TableCell>
                                            <TableCell align="right">Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {stripeFailureLogs?.map((row: any) => {

                                            return (
                                                <TableRow
                                                    key={row.decline_code}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.code}
                                                    </TableCell>
                                                    <TableCell align="right">{row.message}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails >
                    </Accordion>
                </div>
                : <h1>You not admin</h1>}
        </Box>
    );
};

export default SiteAdmin;
