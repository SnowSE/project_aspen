import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



const DonateButton = () => {
    const navigate = useNavigate();
    return (
        <Button
            data-testid="donateMealsBtn"
            id={"donateMealsBtn"}
            onClick={() => navigate('/Donate')}
            variant='contained'
            className="DonateButtonDetails">
            DONATE
        </Button>
    );
}
export { DonateButton };