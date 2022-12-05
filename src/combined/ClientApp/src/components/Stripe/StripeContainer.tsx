import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51M9GZVDsmOjlRQxkaKVVjSHgH2XD7rqrX9gtLdYZHMkldSBdrKfakNTxubrpK45fhc803N03xmwsVwVBthDCXf1800mv19q0yu"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
    return (
        <Elements stripe = {stripeTestPromise}>
            <PaymentForm/>
        </Elements>
    );
}

