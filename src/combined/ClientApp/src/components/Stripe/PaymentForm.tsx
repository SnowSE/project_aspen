import React from 'react'
import {  useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';


export default function PaymentForm() {

    const stripe = useStripe()
    // const elements = useElements()

    

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
                        amount: 100,
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
                <form onSubmit={handleSubmit}>
                    <fieldset className='FormGroup'>
                        <div className='FormRow'>

                        </div>
                    </fieldset>
                    <button>Pay</button>



                </form>

        </>
    );
}