import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { authService } from "../../services/authService"; 

const LoginLanding = () => {
    const navigate = useNavigate()

    useEffect(() => {
        

        authService.signinRedirectCallback().then(
            ({ desiredDestination, user }) => {
                var userName = user.profile.name
                var userEmail = user.profile.email
                var access_token = user.access_token;
                localStorage.setItem("LoggedInUser", userName ? userName : "")
                localStorage.setItem("LoggedInEmail", userEmail ? userEmail : "")
                localStorage.setItem("access_token",  access_token ? access_token : "")

                navigate('/')
                navigate(0)

            }
        );

    }, [navigate]);



    return (<h1>Logging in .....</h1>);
}

export default LoginLanding;



