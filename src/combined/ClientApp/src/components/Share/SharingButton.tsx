import { RWebShare } from "react-web-share";
import ShareIcon from '@mui/icons-material/Share';
import {
    Button,
    IconButton
} from '@mui/material';

const SharingButton = () => {
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
                <Button variant='contained' sx={{ backgroundColor: 'orange', m: 2 }} data-testid={"shareNowBtn"}>SHARE NOW</Button>
            </RWebShare>
        </div>
    );
};

export default SharingButton;
