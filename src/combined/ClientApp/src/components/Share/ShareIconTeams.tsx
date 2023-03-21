import { RWebShare } from "react-web-share";
import ShareIcon from '@mui/icons-material/Share';
import {
    IconButton
} from '@mui/material';

const SharingIconTeams = () => {
    const shareUrl = window.location.href;
    return (
        <div>
            <RWebShare
                data-testid={"shareModal"}
                data={{
                    text: "",
                    url: shareUrl,
                    title: "Name of Event Here"
                }}
                onClick={() => console.log("shared successfully!")}
            >
                <IconButton aria-label="delete" className="ShareIconTeams" size='large'>
                    <ShareIcon />
                </IconButton>
            </RWebShare>
        </div>
    );
};

export default SharingIconTeams;
