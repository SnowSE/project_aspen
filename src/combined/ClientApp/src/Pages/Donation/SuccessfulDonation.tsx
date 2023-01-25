import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Confetti from 'react-confetti'



const SuccessfulDonation = () => {
    const navigate = useNavigate()

    const { personName, teamName, transactionId } = useParams()

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 4000);
    })


    return (
        <>
            {personName === "Anonymous" ?
                <div>
                    <Confetti />
                    <h1 style={{ textAlign: 'center' }}>Thank you stranger for your donation</h1>
                    <h1>Transaction Id: {transactionId}</h1>
                </div>
                :
                <div>
                    <Confetti />

                    <h1 style={{ textAlign: 'center' }}>
                        Thank you {personName} For your donation to the team: {teamName}
                        <h1>Transaction Id: {transactionId}</h1>

                    </h1>
                </div>
            }

        </>
    );
}

export default SuccessfulDonation;