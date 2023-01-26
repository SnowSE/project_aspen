import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const LinkRedirect = () => {
    const navigate = useNavigate()
    const [linkId, setlinkId] = useState(-1);
    const [personId, setPersonId] = useState(-1);
    const path = window.location.pathname.split("/");

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };

    const recordUrl = async () => {
        const url = window.location.pathname.split("/");
        const id = url[url.length - 1];
        setlinkId(parseInt(id));

        try {
            const currentUser = await axios.get(process.env.PUBLIC_URL + "/api/User", config);
            if (currentUser.data.id !== null) {
                setPersonId(currentUser.data.id);
            }
        } catch (e) {
        }

        try {
            await axios.post(`${process.env.PUBLIC_URL}/api/linkrecords`,
                {
                    LinkId: linkId,
                    PersonID: personId,
                    Date: new Date(),
                })
                .catch((error) => { console.log("There was an error", error.response.data) })
        } catch (e) {

        }
    };

    const redirect = async () => {
        const url: string = window.location.pathname;
        const homeUrl: string = process.env.PUBLIC_URL || ''; 
        const newUrl: string = url.split(homeUrl)[1];
        let url2 = newUrl.split("/");
        url2.pop();
        url2.pop();

        let finalUrl = "/";
        if (url2.length > 0) {
            finalUrl = url2.join("/");
        }
        if (url.includes("donation")) {
            // ToDo Donation Logic
            navigate(finalUrl);
        } else {
            navigate(finalUrl);
        }

    };

    useEffect(() => {
        recordUrl();
        redirect();
    }, [])


    return (
        <>
            <div>Got to links {linkId}</div>

        </>
    );
}

export default LinkRedirect;
