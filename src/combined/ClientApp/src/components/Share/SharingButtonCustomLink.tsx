import { RWebShare } from "react-web-share";
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { EventContext } from '../../App';
import axios from "axios";


const SharingButtonCustomLink: React.FC = () => {
    const BaseUrl = process.env.PUBLIC_URL
    const shareUrl = window.location.href;
    const [urlValid, setUrlValid] = useState<boolean>(false);
    const { currentEvent } = useContext(EventContext);
    const [link, setLink] = useState<string>(shareUrl);
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };

    async function buildLink() {
        try {
            const currentUser = await axios.get(process.env.PUBLIC_URL + "/api/User", config);
            if (currentUser.data.id !== null) {
                let responseID = -1;
                await axios.post(`${process.env.PUBLIC_URL}/api/links`,
                    {
                        Id :new Guid(),
                        EventId: currentEvent.id,
                        PersonID: currentUser.data.id,
                        Date: new Date(),
                        LinkURL: shareUrl
                    }).then((response) => {
                        responseID = response.data.id
                    })
                    .catch((error) => { console.log("There was an error", error.response.data); });
                setLink(`${shareUrl} /links/ ${responseID}`);
            }
        } catch (error) {
            console.log(`$Error on building link, error:${error}`);
        }
    }

    const handleClick = async () => {
        await buildLink();
        setUrlValid(true);
    }

    useEffect(() => {
        buildLink();
    }, [urlValid]);

    return (
        <div>
            <RWebShare
                data-testid="shareModal"
                data={{
                    text: "",
                    url: link,
                    title: "Name of Event Here"
                }}
                onClick={handleClick}
            >
                <Button variant='contained' className="ShareButton">SHARE NOW</Button>
            </RWebShare>
            
        </div>
    );
}

export default SharingButtonCustomLink;
