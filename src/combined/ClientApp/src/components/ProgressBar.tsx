import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box>
            <Box className="ProgressBarTextLocation">
                <Typography className="ProgressBarPercentageTextDetails">
                    {`${Math.round(props.value)}%`}
                </Typography>
                
                <Typography className="ProgressBarTextDetails">
                      of meals donated of 10,000 meal goal
                </Typography>
            <br />
            </Box>
            <Box className="ProgressBarBarDetails">
                <LinearProgress variant="determinate" {...props} />
            </Box>
        </Box>
    );
}

export default function ProgressBar() {
    const [progress, setProgress] = React.useState(1);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box className="ProgressBarTextStyling">
            <LinearProgressWithLabel className="ProgressBarDetails" color="success" value={progress} />
        </Box>
    );
}
