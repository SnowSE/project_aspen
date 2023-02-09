import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



const BackToDonationButton = () => {
    const navigate = useNavigate();
    return (
        <Button
            data-testid="backToDonationsBtn"
            id={"backToDonationsBtn"}
            onClick={() => navigate('/Donate')}
            variant='contained'
            className="BackToDonateButtonDetails">
            Back to Donations Page
        </Button>
    );
}
export { BackToDonationButton };