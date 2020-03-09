import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Circle } from "rc-progress";
import theme from "../../theme";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  goalCard: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'relative',
    alignItems: 'center'
  },
  progressCircle: {
    width: '100%'
  },
  currentStatus:{
    position: 'absolute',
    marginTop: 'auto',
    marginBottom: 'auto'
  }
});

interface ProgressCircleProps{

}

const ProgressCircle: React.FC<ProgressCircleProps> = props => {
    const classes = useStyles();
    return (
    <React.Fragment>
        <Card className={classes.goalCard}>
          <CardContent>
            <Circle
              percent={10}
              className={classes.progressCircle}
              strokeWidth={6}
              strokeColor={theme.palette.primary.main}
            />
          </CardContent>
          <Typography component="div" className={classes.currentStatus} >
              <Box fontSize="h4.fontSize">
                $350 | $500
              </Box>
            </Typography>
        </Card>
    </React.Fragment>
  );
};

export default ProgressCircle;
