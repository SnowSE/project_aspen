import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: "Center", minWidth: 35 }}>
                <Typography variant="h6" color="white">
                    {`${Math.round(props.value)}%`}
                </Typography>
                <Typography variant="subtitle2" color="inherit" noWrap>
                    &nbsp;
                </Typography>
                <Typography variant="subtitle2" color="#e0e0e0">
                      of meals donated of 10,000 meal goal
                </Typography>
            <br />
            </Box>
            <Box sx={{ width: '100%', mr: 1 }}>
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
        <Box sx={{ width: '50%' }}>
            <LinearProgressWithLabel sx={{ borderRadius: 100, height: 20 }} color="success" value={progress} />
        </Box>
    );
}
