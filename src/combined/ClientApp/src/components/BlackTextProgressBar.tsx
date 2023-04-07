import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect } from "react";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; goal: number }
) {
  return (
    <Box>
      <Box className="ProgressBarTextLocation">
        <Typography className="ProgressBarPercentageBlackTextDetails">
          {`${Math.round(props.value)}%`}
        </Typography>

        <Typography className="ProgressBarBlackTextDetails">
                  of our ${props.goal.toLocaleString()} 
        </Typography>
        <br />
      </Box>
      <Box className="ProgressBarBarDetails">
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

interface Props {
  goalTotal: number;
  currentTotal: number;
}

export default function BlackTextProgressBar(props: Props) {
  const [progress, setProgress] = React.useState(1);

  useEffect(() => {
    if(props.currentTotal === undefined){
        props.currentTotal =0
    }
    else {

      setProgress((props.currentTotal / props.goalTotal) * 100);
    }
    }, [props]);

  return (
    <Box className="ProgressBarTextStyling">
      <LinearProgressWithLabel
        className="ProgressBarDetails"
        color="success"
        value={progress}
        goal={props.goalTotal}
      />
    </Box>
  );
}
