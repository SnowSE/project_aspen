import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

var PUBLIC_KEY = "pk_live_51MnqsUJ4yuCEmxeT4jStItYLT5RB1lVRIyiw0TiCqNobRbjnJsSLcGdHdtAlEkVJK5AgmEyCJKv9eRDbWZCvKqTf00OJzhSM48"

if(process.env.NODE_ENV === "development"){
    PUBLIC_KEY = "pk_test_51M9GZVDsmOjlRQxkc7okZtT2SmNCn8ocitqt5hyHKKDU5WrjQUPhElLJcW7CaTvNTeITyxwaR8skmZqvKvB73Q6s00mNF15m4n"
}

const stripeTestPromise = loadStripe(PUBLIC_KEY)

interface Props {
    personGUID: string;
}

export default function StripeContainer(props: Props) {
    const { personGUID } = props.personGUID ? props : { personGUID: "" }

    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm personGUID={personGUID} />
        </Elements>
    );
}
