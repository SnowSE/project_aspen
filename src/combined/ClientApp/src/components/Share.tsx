import { RWebShare } from "react-web-share";
import ShareIcon from '@mui/icons-material/Share';
import {
    IconButton
} from '@mui/material';

const Share = () => {
    const shareUrl = window.location.href;
    return (
        <div>
            <RWebShare
                data-testid={"shareModal"}
                data={{
                    text: "",
                    url:  shareUrl,
                    title: "Name of Event Here"
                }}
                onClick={() => console.log("shared successfully!")}
            >
                <IconButton 
                aria-label="delete" 
                sx={{ backgroundColor: '#673ab7', color: 'White' }} 
                size='large'
                data-testid={'shareIconBtn'}>
                    <ShareIcon />
                </IconButton>
            </RWebShare>
        </div>
    );
};

export default Share;
