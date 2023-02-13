import { Accordion, AccordionSummary, Box, Button, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, AccordionDetails } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "../../App";
import EventEditDeleteForm from "../../components/AdminComponents/EventEditDeleteForm";
import TeamMembersListAccordian from "../../components/AdminComponents/TeamMembersListAccordian";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getTeamsList } from "../../components/TeamsInfo/TeamServices";
import Team from "../../JsModels/team";
import PaymentFailure from "../../JsModels/paymentFailure";



const SiteAdmin = () => {
    const { currentEvent } = useContext(EventContext);
    const [teamsList, setTeams] = useState<Team[]>();
    const [stripeFailureLogs, setStripeFailureLogs] = useState<PaymentFailure[]>();
    const [showEditEvent, setShowEditEvent] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentEvent.id) {
                console.log("No current event found!")
                return;
            }
            const endPoint = process.env.PUBLIC_URL +`/api/stripe/failures`;
            var stripeDBLogs = await fetch(endPoint)
            const stripeFailures: PaymentFailure[] = await stripeDBLogs.json()
            var teamsList = await getTeamsList(currentEvent.id)
            var jsonTeams: Team[] = JSON.parse(JSON.stringify(teamsList));
            setStripeFailureLogs(stripeFailures)
            setTeams(jsonTeams)
        }
        fetchData()
    }, [currentEvent])
    return (

        <Box>
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
                    <Typography> Stripe Logs </Typography>
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
        </Box>

    );
};

export default SiteAdmin;
