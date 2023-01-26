import { RWebShare } from "react-web-share";
import { Button } from '@mui/material';
import { useContext, useState } from "react";
import { EventContext } from '../../App';
import axios from "axios";
import Link from "../../JsModels/link";

const SharingButtonCustomLink = () => {
    const BaseUrl = process.env.PUBLIC_URL
    const shareUrl = window.location.href;
    const { currentEvent } = useContext(EventContext);
    const [link, setLink] = useState<string>(shareUrl);
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };


    const buildLink = async () => {
        try {
            const currentUser = await axios.get(process.env.PUBLIC_URL + "/api/User", config);
            if (currentUser.data.id !== null) {
                var linkUrl = `${process.env.PUBLIC_URL}/api/links`;
                console.log("linkURL" + linkUrl);
                await axios.post(`${process.env.PUBLIC_URL}/api/links`,
                    {
                        EventId: currentEvent.id,
                        PersonID: currentUser.data.id,
                        Date: new Date(),
                        LinkURL: shareUrl
                    }).then((response) => {

                        setLink(shareUrl + "links/" + response.data.id);
                    })
                    .catch((error) => { console.log("There was an error", error.response.data) })
            }
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
