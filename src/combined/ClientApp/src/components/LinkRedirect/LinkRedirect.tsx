import axios from "axios";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LinkRedirect: React.FC = () => {
    const navigate = useNavigate();

    const recordUrl = useCallback(async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        };

        const url = window.location.pathname.split("/");
        let personId2 = -1;
        try {
            await axios.get(process.env.PUBLIC_URL + "/api/User", config);

            const currentUser = await axios.get(
                process.env.PUBLIC_URL + "/api/User",
                config
            );
            if (currentUser.data.id !== null) {
                personId2 = currentUser.data.id;
            }
        } catch (error) {
            console.log(error);
        }

        let linkId2 = -1;
        try {
            var linkIdentifier = url[url.length - 1];
            await axios
                .get(`${process.env.PUBLIC_URL}/api/links/${linkIdentifier}`, {
                    params: {
                        linkIdentifier: linkIdentifier,
                    },
                })
                .then((response) => {
                    console.log(response.data.id);
                    linkId2 = response.data.id;
                })
                .catch((error) => {
                    if (error.response) {
                        console.log("There was an error", error.response.data);
                    } else {
                        console.log("There was an error", error);
                    }
                });
        } catch (e) {
            console.log(e);
        }

        try {
            if (linkId2 !== -1) {
                await axios
                    .post(`${process.env.PUBLIC_URL}/api/linkrecords`, {
                        LinkId: linkId2,
                        PersonID: personId2,
                        Date: new Date(),
                    })
                    .catch((error) => {
                        console.log("There was an error", error.response.data);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const redirect = useCallback(() => {
        const url: string = window.location.pathname;
        const homeUrl: string = process.env.PUBLIC_URL || "";
        const newUrl: string = url.split(homeUrl)[1];
        const personGUID: string = newUrl.split("/")[newUrl.split("/").length - 1];
        let url2 = newUrl.split("/");
        url2.pop();
        url2.pop();

        let finalUrl = "/";
        if (url2.length > 1) {
            finalUrl = url2.join("/");
        }
        if (url.includes("Donate" ||"donate")) {
            // ToDo Donation Logic
            navigate(finalUrl, { state: { GUID: { personGUID } } });
        } else {
            navigate(finalUrl);
        }
    }, [navigate]);

    useEffect(() => {
        recordUrl();
        redirect();
    }, [recordUrl, redirect]);

    return (
        <>
            <div>You will be redirect momentarily.</div>
        </>
    );
};

export default LinkRedirect;
