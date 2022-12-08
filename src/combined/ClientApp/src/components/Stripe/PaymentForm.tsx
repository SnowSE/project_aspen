import React, { useState } from 'react'
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Box, TextField } from '@mui/material';
import { Button } from 'reactstrap';


export default function PaymentForm() {

    const stripe = useStripe()
    // const elements = useElements()
    const [donationAmount, setDonationAmount] = useState<number>(0)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("paying")
        // const paymentMethodResult = await stripe?.createPaymentMethod({
        //     type: "card",
        //     card: elements!.getElement(CardElement)!
        // })

        // console.log(paymentMethodResult)
        // if (!paymentMethodResult?.error) {
        try {
            // const id = paymentMethodResult?.paymentMethod.id
            await axios.post("https://localhost:44478/aspen/new/api/stripe",
                {
                    amount: (donationAmount * 1000),
                    id: "bob",
                    teamName: "Snow_Team"
                }).then((response) => {
                    const session = response.data.sessionId
                    stripe?.redirectToCheckout({ sessionId: session })
                })
                .catch((error) => { console.log("There was an error", error.response.data) })

        } catch (error) {
            console.log("error is: ", error)
        }
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