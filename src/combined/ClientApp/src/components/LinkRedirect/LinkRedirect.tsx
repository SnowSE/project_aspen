import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const LinkRedirect: React.FC = () => {
    const navigate = useNavigate()
    const [linkId, setlinkId] = useState(-1);
    const [personId, setPersonId] = useState(-1);


    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };

    const currentUser = async () => {

        try {
            const user = await axios.get(process.env.PUBLIC_URL + "/api/User", config);

            const currentUser = await axios.get(process.env.PUBLIC_URL + "/api/User", config);
            if (currentUser.data.id !== null) {
                setPersonId(currentUser.data.id);
            }

        }
        catch (error) {
            console.log(error);
        };
    }
    

    
    async function recordUrl() {
        const url = window.location.pathname.split("/");
        console.log(personId);
        console.log(linkId);
        let personId2 = -1;
        try {
            const user = await axios.get(process.env.PUBLIC_URL + "/api/User", config);

            const currentUser = await axios.get(process.env.PUBLIC_URL + "/api/User", config);
            if (currentUser.data.id !== null) {
                setPersonId(currentUser.data.id);
                personId2 = currentUser.data.id
            }

        }
        catch (error) {
            console.log(error);
        };

        let linkId2 = -1;
        try {
            var linkIdentifier = url[url.length - 1];
            var response = await axios.get(`${process.env.PUBLIC_URL}/api/links/${linkIdentifier}`, {
                params: {
                    linkIdentifier: linkIdentifier
                }
            }).then((response) => {
                console.log(response.data.id);
                setlinkId(response.data.id)
                linkId2 = response.data.id;
            })
                .catch((error) => {
                    if (error.response) {
                        console.log("There was an error", error.response.data)
                    } else {
                        console.log("There was an error", error);
                    }
                });

        } catch (e) {
            console.log(e);
        }
        console.log(personId2);
        console.log(linkId2);
        try {
            if (linkId2 !== -1) {
                await axios.post(`${process.env.PUBLIC_URL}/api/linkrecords`,
                    {
                        LinkId: linkId2,
                        PersonID: personId2,
                        Date: new Date(),
                    })
                    .catch((error) => { console.log("There was an error", error.response.data); })
            }
        }
        catch (error) {
            console.log(error);
        };
    };

    const redirect = async () => {
        console.log(personId);
        console.log(linkId);
        const url: string = window.location.pathname;
        const homeUrl: string = process.env.PUBLIC_URL || '';
        const newUrl: string = url.split(homeUrl)[1];
        let url2 = newUrl.split("/");
        url2.pop();
        url2.pop();

        let finalUrl = "/";
        if (url2.length > 1) {
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
        currentUser();
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
