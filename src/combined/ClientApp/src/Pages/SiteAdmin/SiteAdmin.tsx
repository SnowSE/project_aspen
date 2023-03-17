import { Accordion, AccordionSummary, Box, Button, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, AccordionDetails } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../../App";
import EventEditDeleteForm from "../../components/AdminComponents/EventEditDeleteForm";
import TeamMembersListAccordian from "../../components/AdminComponents/TeamMembersListAccordian";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getTeamsList } from "../../components/TeamsInfo/TeamServices";
import Team from "../../JsModels/team";
import PaymentFailure from "../../JsModels/paymentFailure";
import { authService } from "../../services/authService";
import axios from "axios";
import DynamicModal from "../../components/DynamicModal";



const SiteAdmin = () => {
    const { currentEvent } = useContext(EventContext);
    const [teamsList, setTeams] = useState<Team[]>();
    const [stripeFailureLogs, setStripeFailureLogs] = useState<PaymentFailure[]>();
    const [showEditEvent, setShowEditEvent] = useState(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [totalDonations, setTotalDonations] = useState<number>(0);
    const [message, setMessage] = useState("");
    const [openArchiveModal, setopenArchiveModal] = useState(false);
    const [isOkModal, setIsOkModal] = useState(false);
    const navigate = useNavigate();

   
    const accessToken = localStorage.getItem("access_token");

    const config = useMemo(() => {
      return {
        headers: { Authorization: `Bearer ${accessToken}` }
      };
    }, [accessToken]);


    useEffect(() => {

        async function currentUser() {
            var user = await authService.getUser()
            user?.profile.roles.forEach((role: string) => {
                console.log(role)
                if (role.includes("admin")) {
                    setIsAdmin(true)
                }
            });
        }
    const fetchData = async () => {
        const paymentFailures = process.env.PUBLIC_URL + `/api/stripe/failures`;
        const allDonations = process.env.PUBLIC_URL + `/api/donations/totalDonations`;
        var donationCount= await fetch(allDonations)
        var stripeDBLogs = await fetch(paymentFailures, {headers: config.headers})
        const donations = await donationCount.json();
        const stripeFailures: PaymentFailure[] = await stripeDBLogs.json()
        var teamsList = await getTeamsList(currentEvent.id)
        var jsonTeams: Team[] = JSON.parse(JSON.stringify(teamsList));

        setTotalDonations(donations);
        setStripeFailureLogs(stripeFailures)
        setTeams(jsonTeams)
    }

        fetchData()
        currentUser()

    },[currentEvent, config])

    const archiveTeam = async (team: Team) => {
        console.log("here")
        team.isArchived = true
        const teamArchiveUrl = process.env.PUBLIC_URL + `/api/teams`;
        await axios.put(teamArchiveUrl, team, config);
    }

   

    const closeModal = () => {
        setopenArchiveModal(false)
        setIsOkModal(false)
    }

    return (
        <Box>

            {isAdmin ?
                <div>
                    <Paper square={true} elevation={6} className="AdminPaperDetails">
                        <Box className="AdminCurrentEventDetails">
                            {
                                showEditEvent === true ? <Typography className="AdminCurrentEventTextDetails"> Current Event: {currentEvent?.title}</Typography> : <EventEditDeleteForm />
                            }
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
                                        <Typography>
                                            {t.name}
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
                                                onClick={() => { setMessage("Are you sure you want to delete " + t.name + "?"); setopenArchiveModal(true); }}
                                            > Delete
                                            </Button>
                                            <DynamicModal
                                                open={openArchiveModal}
                                                close={closeModal}
                                                message={message}
                                                onConfirm={() => archiveTeam(t)}
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
                        </AccordionDetails>
                    </Accordion>
                </div>
                : <h1>You not admin</h1>}
        </Box>
    );
};

export default SiteAdmin;
