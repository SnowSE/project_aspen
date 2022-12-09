import React, { useContext, useEffect, useState } from 'react'
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Box, TextField } from '@mui/material';
import { Button } from 'reactstrap';
import { EventContext } from '../../App';


export default function PaymentForm() {

    const stripe = useStripe()

    const { currentEvent, loading } = useContext(EventContext);

    const [donationAmount, setDonationAmount] = useState<number>(0)
    const [teamId, setTeamId] = useState<number>(0)
    const [teamName, setTeamName] = useState<string>('')
    const [userId, setUserId] = useState<number>(0)
    const [userName, setUserName] = useState<string>('')


    const BaseUrl = process.env.PUBLIC_URL
    useEffect(() => {

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };


        const getUser = async () => {
            await axios.get(BaseUrl + '/api/user', config).then((response) => {
                setUserId(response?.data?.id)
                setUserName(response?.data?.name)
            })
        }


        const getTeam = async () => {
            await axios.get(BaseUrl + '/api/Person/' + userId + '/registrations').then((response) => {
                response.data.forEach((registration: any) => {
                    if (registration.ownerID === userId) {

                        setTeamId(registration.teamID)
                    }

                })
            }).catch((error) => { console.log("error is: ", error) })
        }

        const getTeamName = async () => {
            await axios.get(BaseUrl + '/api/teams/' + teamId).then((response) => {
                setTeamName(response.data.name)
            })
        }


        const serviceCalls = async () => {
            await getUser()
            await getTeam()
            await getTeamName()
        }

        serviceCalls()

    }, [teamId, userId, loading, BaseUrl])



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // const paymentMethodResult = await stripe?.createPaymentMethod({
        //     type: "card",
        //     card: elements!.getElement(CardElement)!
        // })

        // console.log(paymentMethodResult)
        // if (!paymentMethodResult?.error) {
        // const id = paymentMethodResult?.paymentMethod.id

        await axios.post("https://localhost:44478/aspen/new/api/stripe",
            {
                amount: (donationAmount * 1000),
                id: "paymentid",
                teamName: teamName,
                teamId: teamId,
                personId: userId,
                eventId: currentEvent.id,
                personName: userName
            }).then((response) => {
                const session = response.data.sessionId
                stripe?.redirectToCheckout({ sessionId: session })
            })
            .catch((error) => { console.log("There was an error", error.response.data) })


    }


    return (
        <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        id="filled-number"
                        label="Meals"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        variant="filled"
                        onChange={(e) => setDonationAmount(Number(e.target.value))}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant='contained'
                        sx={{ backgroundColor: "orange" }}>
                        Donate Now
                    </Button>
                </Box>



            </form>

        </>
    );
}