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

            var linkUrl = "/api/link";
            await axios.post("https://localhost:44478/aspen/new/api/links",
                {
                    EventId : currentEvent.id,
                    PersonID : currentUser.data.id,
                    Date : new Date(),
                    LinkURL  : shareUrl        
                }).then((response) => {

                    setLink(shareUrl + "/link/" + response.data.id);
               })
                .catch((error) => { console.log("There was an error", error.response.data) })
            //var response = await axios.post(`${BaseUrl}/api/events`, newLink)
            //    .then((response) => { newLink.id = response.data.id })
            //    .catch((error) => { console.log(error.response.data) })
            //setLink(shareUrl + "/link");

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
