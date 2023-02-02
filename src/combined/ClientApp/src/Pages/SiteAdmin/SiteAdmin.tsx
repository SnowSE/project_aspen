<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=windows-1252">
    <link rel="alternate stylesheet" type="text/css" href="resource://gre-resources/plaintext.css"

      title="Wrap Long Lines">
  </head>
  <body>
    <pre>import { Accordion, AccordionSummary, Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "../../App";
import EventEditDeleteForm from "../../components/AdminComponents/EventEditDeleteForm";
import TeamMembersListAccordian from "../../components/AdminComponents/TeamMembersListAccordian";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getTeamsList } from "../../components/TeamsInfo/TeamServices";
import Team from "../../JsModels/team";



const SiteAdmin = () =&gt; {
    const { currentEvent } = useContext(EventContext);
    const [teamsList, setTeams] = useState&lt;Team[]&gt;();
    const [showEditEvent, setShowEditEvent] = useState(true);

    useEffect(() =&gt; {
        const fetchData = async () =&gt; {
            if (!currentEvent.id) {
                console.log("No current event found!")
                return;
            }
            var teamsList = await getTeamsList(currentEvent.id)
            var jsonTeams: Team[] = JSON.parse(JSON.stringify(teamsList));
            setTeams(jsonTeams)
        }
        fetchData()
    }, [currentEvent])

    return (

        &lt;Box&gt;
            &lt;Paper square={true} elevation={6} className="AdminPaperDetails"&gt;
                &lt;Box className="AdminCurrentEventDetails"&gt;
                    {
                        showEditEvent === true ? &lt;Typography className="AdminCurrentEventTextDetails"&gt; Current Event: {currentEvent?.title}&lt;/Typography&gt; : &lt;EventEditDeleteForm /&gt;
                    }
                    &lt;Button type='button' variant='contained' className="AdminButtonDetails" onClick={() =&gt; setShowEditEvent((prevState) =&gt; !prevState)}&gt;
                        {
                            showEditEvent === true ? "Edit" : "Close"
                        }
                    &lt;/Button&gt;
                &lt;/Box&gt;
            &lt;/Paper&gt;
            &lt;Accordion className="AccordionSpacing"&gt;
                &lt;AccordionSummary
                    className="AccordionDetails"
                    expandIcon={&lt;ExpandMoreIcon /&gt;}
                &gt;
                    &lt;Typography&gt; Teams &lt;/Typography&gt;
                &lt;/AccordionSummary&gt;
                {teamsList?.map((t: any, id) =&gt; {
                    return (
                        &lt;Accordion className="InnerAccordionSpacing"&gt;
                            &lt;AccordionSummary
                                className="InnerAccordionDetails"
                                expandIcon={&lt;ExpandMoreIcon /&gt;}
                            &gt;
                                    &lt;Typography&gt;
                                        {t.name}
                                    &lt;/Typography&gt;
                                &lt;Box className="TeamsSpacing"&gt;
                                    &lt;Button
                                        variant="contained"
                                        className="UpdateTeamButtonDetails"
                                        type="submit"
                                    &gt;Update
                                    &lt;/Button&gt;
                                    &lt;Button
                                        variant="contained"
                                        className="DeleteTeamButtonDetails"
                                        type="button"
                                    &gt; Delete
                                    &lt;/Button&gt;
                                &lt;/Box&gt;
                            &lt;/AccordionSummary&gt;
                            &lt;TeamMembersListAccordian /&gt;
                        &lt;/Accordion&gt;
                    )
                })}
            &lt;/Accordion&gt;
        &lt;/Box&gt;

    );
};

export default SiteAdmin;
</pre>
  </body>
</html>
