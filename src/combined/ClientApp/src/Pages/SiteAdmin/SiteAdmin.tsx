import { Accordion, AccordionSummary, Box, Button, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, AccordionDetails } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "../../App";
import EventEditDeleteForm from "../../components/AdminComponents/EventEditDeleteForm";
import TeamMembersListAccordian from "../../components/AdminComponents/TeamMembersListAccordian";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getTeamsList } from "../../components/TeamsInfo/TeamServices";
import Team from "../../JsModels/team";
import PaymentFailure from "../../JsModels/paymentFailure";
import { authService } from "../../services/authService";



const SiteAdmin = () => {
    const { currentEvent } = useContext(EventContext);
    const [teamsList, setTeams] = useState<Team[]>();
    const [stripeFailureLogs, setStripeFailureLogs] = useState<PaymentFailure[]>();
    const [showEditEvent, setShowEditEvent] = useState(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [totalDonations, setTotalDonations] = useState<number>(0);
    useEffect(() => {
        const fetchData = async () => {
            if (!currentEvent.id) {
                console.log("No current event found!")
                return;
            }
            const paymentFailures = process.env.PUBLIC_URL +`/api/stripe/failures`;
            const allDonations = process.env.PUBLIC_URL + `/api/donations/totalDonations`;
            var donationCount= await fetch(allDonations)
            var stripeDBLogs = await fetch(paymentFailures)
            const donations = await donationCount.json();
            const stripeFailures: PaymentFailure[] = await stripeDBLogs.json()
            var teamsList = await getTeamsList(currentEvent.id)
            var jsonTeams: Team[] = JSON.parse(JSON.stringify(teamsList));
            
            setTotalDonations(donations);
            setStripeFailureLogs(stripeFailures)
            setTeams(jsonTeams)
        }
        async function currentUser() {
            var user = await authService.getUser()
            console.log("user roles:", user?.profile.roles)
            user?.profile.roles.forEach((role: string) => {
                console.log(role)
                if (role.includes("admin")) {
                    setIsAdmin(true)
                }
            });
        }
        currentUser()
        fetchData()
    }, [currentEvent])

    useEffect(() => {
        
        
    }, [])
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
                </Box>
            </Paper>
            <Accordion className="AccordionSpacing">
                <AccordionSummary
                    className="AccordionDetails"
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography> Teams </Typography>
                </AccordionSummary>
                {teamsList?.map((t: any, id) => {
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
                                    > Delete
                                    </Button>
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
                            {stripeFailureLogs?.map((row : any) => {

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
                            )})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            </div>
                    : <h1>You not admin</h1> }
        </Box>
     );
};

export default SiteAdmin;
