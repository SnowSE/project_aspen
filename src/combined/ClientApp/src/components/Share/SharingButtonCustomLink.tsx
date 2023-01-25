import { RWebShare } from "react-web-share";
import { Button } from '@mui/material';
import { useContext, useState } from "react";
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
            let newLink = new Link(
                currentEvent.id,
                new Date(),
                shareUrl,
                currentUser.data.id,
            );
            var linkUrl = `${process.env.PUBLIC_URL}/api/link`;
            
            var response = await axios.post(linkUrl, newLink, config)
                .then((response) => { newLink.id = response.data.id })
                .catch((error) => { console.log(error.response.data) })
            setLink(shareUrl + "/link");

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
                onClick={() => buildLink()}
            >
                <Button variant='contained' className="ShareButton">SHARE NOW</Button>
            </RWebShare>
        </div>
    );
};

export default SharingButtonCustomLink;
