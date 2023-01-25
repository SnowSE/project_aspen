import { RWebShare } from "react-web-share";
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { EventContext } from '../../App';
import axios from "axios";
import Link from "../../JsModels/link";

const SharingButtonCustomLink = () => {
    const shareUrl = window.location.href;
    const { currentEvent } = useContext(EventContext);
    const [link, setLink] = useState<string>(shareUrl);
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };


    const buildLink = async () => {
        try {
            const currentUser = await axios.get(process.env.PUBLIC_URL + "/api/User", config);
            const tempLink = new Link(
                currentEvent.id,
                new Date(),
                shareUrl,
                currentUser.data.id,
            );
            var teamUrl = process.env.PUBLIC_URL + "/api/link";
            const response = await axios.post(teamUrl, tempLink).catch((error) => { console.log("There was an error", error.response.data) })
            //setLink(shareUrl + "/link/");

        } catch (error) {
            console.log(`$Failed to get current user, error:${error}`);
        }
    };

    return (
        <div>
            <RWebShare
                data-testid={"shareModal"}
                data={{
                    text: "",
                    url: link,
                    title: "Name of Event Here"
                }}
                onClick={() => console.log("shared successfully!")}
            >
                <Button variant='contained' className="ShareButton">SHARE NOW</Button>
            </RWebShare>
        </div>
    );
};

export default SharingButtonCustomLink;
