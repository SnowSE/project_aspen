import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Swagger = () => {

    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }

    useEffect(() => {
        refreshPage();
    });
        return (
            <>
                <Navigate to="index.html" replace={true} />
            </>
        );
    }

export { Swagger };