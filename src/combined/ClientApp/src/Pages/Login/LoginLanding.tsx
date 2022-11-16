import { useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { authService } from "../../services/authService"; 

const LoginLanding = () => {
    const navigate = useNavigate()
    useEffect(() => {
        authService.signinRedirectCallback().then(
            ({ desiredDestination, user }) => {
                const serializedUser = JSON.parse(JSON.stringify(user));
                console.log("serialized is: ", serializedUser)
                var userName = user.profile.name
                var access_token = user.access_token;
                localStorage.setItem("LoggedInUser", userName ? userName : "")
                localStorage.setItem("access_token",  access_token ? access_token : "")
                navigate('/')
                navigate(0)
            }
        );
    }, []);

    return (<h1>Logging in .....</h1>);
}

export default LoginLanding;



