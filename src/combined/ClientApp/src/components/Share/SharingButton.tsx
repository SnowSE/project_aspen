import { RWebShare } from "react-web-share";
import { Button } from '@mui/material';

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
                <Button variant='contained' className="ShareButton">SHARE NOW</Button>
            </RWebShare>
        </div>
    );

};

export default SharingButton;
