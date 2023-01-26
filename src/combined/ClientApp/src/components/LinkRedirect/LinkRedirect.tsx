import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";




const LinkRedirect = () => {
    const navigate = useNavigate()
    const [linkId, setlinkId] = useState(-1);
    const path = window.location.pathname.split("/");

    const recordUrl = async () => {
        const url = window.location.pathname.split("/");
        const id = url[url.length - 1];
        setlinkId(parseInt(id));


    } 

    useEffect(() => {
        recordUrl();
    })


    return (
        <>
            <div>Got to links {linkId}</div>

        </>
    );
}

export default LinkRedirect;
