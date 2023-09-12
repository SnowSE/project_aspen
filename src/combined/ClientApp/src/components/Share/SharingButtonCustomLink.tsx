import { RWebShare } from "react-web-share";
import { Button } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from "react";
import { EventContext } from '../../App';
import axios from "axios";

interface DynamicShareNowProps {
    defaultMessage: string;
    defaultSubject: string;
}

const SharingButtonCustomLink = ({defaultMessage, defaultSubject}: DynamicShareNowProps): JSX.Element => {
    const shareUrl = window.location.href;
    const { currentEvent } = useContext(EventContext);
    const [linkGUID, setlinkGUID] = useState<string>("");
    const [linkShareUrl, setLinkShareUrl] = useState<string>(shareUrl);
    const [currentUserId, setCurrentUserId] = useState<number>(-1);


    function generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
            return v.toString(16);
        });
    }
    
    const getCurrentUser = useCallback(async () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
        try {
            const currentUser = await axios.get(process.env.PUBLIC_URL + "/api/User", config);
            if (currentUser.data.id != null) {
                setCurrentUserId(currentUser.data.id);
            };
        }
        catch (error) {

        };
    }, [setCurrentUserId]);
    

    async function postLink() {
        if (linkShareUrl === null || linkGUID === "") {
        const tempLinkGUID = generateGUID()
            setlinkGUID(tempLinkGUID);
            let shareUrlFinal = shareUrl + "/links/" + tempLinkGUID
            setLinkShareUrl(shareUrl + "/links/" + tempLinkGUID);
            try {
                if (currentUserId !== -1) {
                    await axios.post(`${process.env.PUBLIC_URL}/api/links`,
                        {
                            eventID: currentEvent.id,
                            personID: currentUserId,
                            date: new Date(),
                            linkURL: shareUrlFinal,
                            linkGUID: tempLinkGUID
                        })
                }
            }
            catch (error ) {

            };
        }
        else if (currentUserId !== -1) {
            try {
                await axios.post(`${process.env.PUBLIC_URL}/api/links`,
                    {
                        eventID: currentEvent.id,
                        personID: currentUserId,
                        date: new Date(),
                        linkURL: linkShareUrl,
                        linkGUID: linkGUID
                    })
            }
            catch (error) {

            };

        }
        else {
            setLinkShareUrl(shareUrl)
        }

        setlinkGUID("");
    }

    const handleClick = async () => {
        await getCurrentUser();
        await postLink();

    }

    useEffect(() => {
        getCurrentUser();
        const tempLinkGUID = generateGUID()
        setlinkGUID(tempLinkGUID);
        setLinkShareUrl(shareUrl + "/links/" + tempLinkGUID);
    }, [shareUrl, setLinkShareUrl, getCurrentUser]);

    return (
        <div>
            <RWebShare
                data-testid="shareModal"
                data={{
                    text: defaultMessage,
                    url: linkShareUrl,
                    title: defaultSubject   
                }}
                onClick={handleClick}
            >
                <Button variant='contained' className="ShareButton">SHARE NOW</Button>
            </RWebShare>

        </div>
    );
}

export default SharingButtonCustomLink;
