import { RWebShare } from "react-web-share";
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { EventContext } from '../../App';
import axios from "axios";



const SharingButtonCustomLink: React.FC = () => {
    const shareUrl = window.location.href;
    const { currentEvent } = useContext(EventContext);
    const [linkIdentifier, setlinkIdentifier] = useState<string>("");
    const [linkShareUrl, setLinkShareUrl] = useState<string>(shareUrl);
    const [currentUserId, setCurrentUserId] = useState<number>(-1);
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };

    function generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
            return v.toString(16);
        });
    }

    async function getCurrentUser() {
        try {
            const currentUser = await axios.get(process.env.PUBLIC_URL + "/api/User", config);
            if (currentUser.data.id != null) {
                setCurrentUserId(currentUser.data.id);
            };
        }
        catch (error) {
            console.log(error);
        };
    }
    async function postLink() {
            const tempLinkIdentifier = generateGUID()
        if (linkShareUrl === null || linkIdentifier === "") {
            setlinkIdentifier(tempLinkIdentifier);
            let shareUrlFinal = shareUrl + "/links/" + tempLinkIdentifier
            setLinkShareUrl(shareUrl + "/links/" + tempLinkIdentifier);
            try {
                if (currentUserId !== -1) {
                    await axios.post(`${process.env.PUBLIC_URL}/api/links`,
                        {
                            eventID: currentEvent.id,
                            personID: currentUserId,
                            date: new Date(),
                            linkURL: shareUrlFinal,
                            linkIdentifer: tempLinkIdentifier
                        })
                        .catch((error) => { console.log("There was an error", error.response.data); })
                }
            }
            catch (error) {
                console.log(error);
            };
        }
        else if (currentUserId !== -1) {
            try {
                if (currentUserId !== -1) {
                    await axios.post(`${process.env.PUBLIC_URL}/api/links`,
                        {
                            eventID: currentEvent.id,
                            personID: currentUserId,
                            date: new Date(),
                            linkURL: linkShareUrl,
                            linkIdentifer: linkIdentifier
                        })
                        .catch((error) => { console.log("There was an error", error.response.data); })
                }
            }
            catch (error) {
                console.log(error);
            };

        }
        else {
            setLinkShareUrl(shareUrl)
        }
        
        setlinkIdentifier("");
    }

    const handleClick = async () => {
        await getCurrentUser();
        await postLink();

    }

    useEffect(() => {
        const tempLinkIdentifier = generateGUID()
        setlinkIdentifier(tempLinkIdentifier);
        setLinkShareUrl(shareUrl + "/links/" + tempLinkIdentifier);
    }, [shareUrl, currentUserId, setLinkShareUrl]);

    return (
        <div>
            <RWebShare
                data-testid="shareModal"
                data={{
                    text: "",
                    url: linkShareUrl,
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
