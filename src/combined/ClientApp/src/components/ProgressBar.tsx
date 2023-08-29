import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number; goal: number }) {
    return (
        <Box>
            <Box className="ProgressBarTextLocation" >
                <Typography className="ProgressBarPercentageTextDetails" >
                    {`${props.value ? Math.round(props.value) : 0}%`}
                </Typography>

                <Typography className="ProgressBarTextDetails">
                    of our ${props.goal.toLocaleString()} dollar goal.
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

export default function ProgressBar(props: Props) {
    const [progress, setProgress] = React.useState(1);

    useEffect(() => {
        setProgress((props.currentTotal / props.goalTotal) * 100);
    }, [props.goalTotal, props.currentTotal]);

    return (
        <Box className="ProgressBarTextStyling" >
            <LinearProgressWithLabel className="ProgressBarDetails" color="success" value={progress} goal={props.goalTotal}/>
        </Box>
    );
}
