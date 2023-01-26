import { useEffect } from "react";
import { useNavigate} from "react-router-dom";




const LinkRedirect = () => {
    const navigate = useNavigate()



    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 4000);
    })


    return (
        <>
            <div>Got to links</div>

        </>
    );
}

export default LinkRedirect;