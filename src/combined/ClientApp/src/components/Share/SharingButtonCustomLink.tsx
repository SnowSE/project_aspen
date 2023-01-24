import { RWebShare } from "react-web-share";
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { EventContext } from '../../App';
import axios from "axios";

const SharingButtonCustomLink = () => {
    const shareUrl = window.location.href;
    const { currentEvent } = useContext(EventContext);
    const [link, setLink] = useState<string>(shareUrl);
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };

    const buildLink = async () => {

        ////No current Event
        //if (currentEvent.id !== -1) {
        //    setLink(shareUrl +)
        //}

    };

    const getUser = async () => {
        
        try {
            const currentUser = await axios.get(process.env.PUBLIC_URL + "/api/User", config);
            console.log(`$CurrentUser:${currentUser.data.id}`);

        } catch (error) {
            console.log(`$Failed to get current user, error:${error}`);
        }



    };

    const getLinkID = async () => {


    };

    useEffect(() => {
        getUser();
        //getLinkID();
        //buildLink();
        console.log(link);
    }, []);

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
