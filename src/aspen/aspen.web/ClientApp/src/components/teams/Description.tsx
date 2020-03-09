import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Progress } from "reactstrap";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import theme from "../../theme";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import ShareIcon from "@material-ui/icons/Share";
import CardContent from "@material-ui/core/CardContent";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { Line, Circle } from "rc-progress";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  mainCard: {
    height: 700,
    display: "block"
  },
  leftPanel: {
    float: "left",
    width: "calc(35% - 20px)",
    margin: 10
  },
  teamDescription: {
    float: "left",
    width: "calc(65% - 20px)",
    margin: 10,
    padding: 25,
    minHeight: 700
  },
  teamImage: {
    marginBottom: 75,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: 500,
    filter: "brightness(75%)",
    backgroundImage:
      "url(https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg)"
  },
  button: {
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
    height: 50,
    backgroundColor: theme.palette.secondary.main,
    color: "white"
  },
  goalCard: {
    display: "block",
    width: "calc(50% - 20px)"
  },
  goal: {
    width: "100%",
    margin: 10
  },
  progressBar: {
    margin: 20,
    height: 50,
    borderRadius: 50,
    color: "red"
  },
  progressCircle: {
    height: 150,
    marginRight: 20
  }
});

interface DescriptionProps {}

const Description: React.FC<DescriptionProps> = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.mainCard}>
        <div className={classes.leftPanel}>
          <div className={classes.teamImage}></div>
          <Button
            className={classes.button}
            variant="contained"
            startIcon={<MonetizationOnIcon></MonetizationOnIcon>}
          >
            Donate
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            startIcon={<ShareIcon></ShareIcon>}
          >
            Share
          </Button>
        </div>
        <Paper elevation={3} className={classes.teamDescription}>
          <Typography variant="h2" gutterBottom>
            Team Name
          </Typography>
          <Typography variant="h5" gutterBottom>
            Our Story
          </Typography>
          <Divider />
          <Typography variant="body1">
            This was the day that everything changed. If you asked me back then,
            I would have said it changed for the worse. But if you ask me today,
            I am starting to think that it was the best change our family could
            have ever asked for. This was the day that we were told our little
            boy would be born with Down Syndrome. It was 7 dark weeks that
            followed. Weeks filled with sadness ... and anger ... and fear ...
            and confusion ... and disappointment. There was so much uncertainty
            around raising a baby with needs that we felt were beyond our
            capability. So much sadness around raising a kiddo that wouldn't be
            able to do what Otto could do. So much questioning W H Y and trying
            to figure out what this meant for our family and feeling the guilt
            that surrounded all of these feelings. Because of Gigi's Playhouse,
            UDSF and United Angels, these negative thoughts starting dissolving
            and began to be replaced with positive ones: With thoughts of
            interest and intrigue rather than uncomfortableness and mourning.
            The minute he was born I knew that all those things I felt before
            had no place here anymore, for he was exactly who he was meant to be
            and he was perfectly fitting for us. The families we have met over
            the last 6 months have been life-changing for this new path in our
            journey, as they knew before we did how special this baby was going
            to be. These organizations opened their arms to us and pulled us in
            with hugs and genuine excitement for our unborn child. Our unborn
            child with Down Syndrome.
          </Typography>
        </Paper>
      </div>
      <div className={classes.goalCard}>
        <Card className={classes.goal} variant="outlined">
          <CardContent>
            <Grid container alignItems="center">
              <Circle
                percent={10}
                className={classes.progressCircle}
                strokeWidth={8}
                strokeColor={theme.palette.primary.main}
              />
              <Divider orientation="vertical" flexItem />
              <Typography variant="h5" gutterBottom>
                <Box fontStyle="italic" mt={-5} m={1}>
                  Our Goal
                </Box>
                <Box fontStyle="vold" m={1}>
                  $500
                </Box>
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Description;
