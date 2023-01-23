import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51M9GZVDsmOjlRQxkc7okZtT2SmNCn8ocitqt5hyHKKDU5WrjQUPhElLJcW7CaTvNTeITyxwaR8skmZqvKvB73Q6s00mNF15m4n"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
    return (
        <Elements stripe = {stripeTestPromise}>
            <PaymentForm/>
        </Elements>
    );
}

