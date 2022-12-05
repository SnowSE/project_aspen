import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';


export default function PaymentForm() {

    const [success, setSuccess] = useState<boolean>(false)
    const stripe = useStripe()
    const elements = useElements()

    // type PaymentMethodResult = {
    //     paymentMethod: PaymentMethod;
    //     error?: undefined;
    // } | {
    //     paymentMethod?: undefined;
    //     error: StripeError;
    // }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("paying")
        const paymentMethodResult = await stripe?.createPaymentMethod({
            type: "card",
            card: elements!.getElement(CardElement)!
        })

        console.log(paymentMethodResult)
        if (!paymentMethodResult?.error) {
            try {
                const id = paymentMethodResult?.paymentMethod.id
                const response = await axios.post("https://localhost:44478/aspen/new/api/stripe",
                    {
                        amount: 100,
                        id: id, 
                        teamName: "asdf"
                    })

                if (response.data.success) {
                    console.log("successful payment")
                    setSuccess(true)
                    console.log("response si: ", response)
                }

            } catch (error) {
                console.log("error is: ", error)
            }
        }
        else {
            console.log("here")
        }

    }


    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className='FormGroup'>
                        <div className='FormRow'>
                            <CardElement  />


                        </div>
                    </fieldset>
                    <button>Pay</button>

                </form>
                : <h1>Success</h1>}
        </>
    );
}