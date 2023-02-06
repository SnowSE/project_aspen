import React, {  useContext, useEffect, useState } from 'react'
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Box, TextField } from '@mui/material';
import { Button } from 'reactstrap';
import { EventContext } from '../../App';

interface Props {
    personGUID?: string;
}

const PaymentForm: React.FC<Props> = (props) => {

    const stripe = useStripe()

    const { currentEvent, loading } = useContext(EventContext);

    const [donationAmount, setDonationAmount] = useState<number>(0)
    const [teamId, setTeamId] = useState(null)
    const [teamName, setTeamName] = useState<string>('')
    const [linkGuid, setLinkGuid] = useState<string | undefined>(props.personGUID)
    const [userId, setUserId] = useState<string | number | null | undefined>(null);
    const [userName, setUserName] = useState<string>('')
    const [canSubmit, setCanSubmit] = useState<boolean>(false)

    const [donationSubmitName, setDonationSubmitName] = useState<string>('')
    const [donationEmail, setDonationEmail] = useState<string>('')
    const [donationPhoneNumber, setDonationPhoneNumber] = useState<string>('')

    const BaseUrl = process.env.PUBLIC_URL

    useEffect(() => {

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };

        const getUser = async () => {
            await axios.get(BaseUrl + '/api/user', config).then((response) => {
                setUserId(response?.data?.id)
                setUserName(response?.data?.name)
            }).catch((error) => {
                setUserName("Anonymous")
            })
        }
        const getTeam = async () => {
            await axios.get(BaseUrl + '/api/Person/' + userId + '/registrations').then((response) => {
                response.data.forEach((registration: any) => {
                    if (registration.ownerID === userId) {

                        setTeamId(registration.teamID)
                    }

                })
            }).catch((error) => {
            })
        }

        const getTeamName = async () => {
            await axios.get(BaseUrl + '/api/teams/' + teamId).then((response) => {
                setTeamName(response.data.name)
            }).catch((error) => {
                setTeamName("Anonymous")
            })
        }

        const serviceCalls = async () => {
            await getUser()
            if (linkGuid !== "" && userId === null) {
                console.log(linkGuid)
                setTeamName("Anonymous")

            }
            else {
                await getTeam()
                await getTeamName()

            }
        }
        serviceCalls()

    }, [teamId, loading, BaseUrl])

    useEffect(() => {
        console.log("here in second use effect")
        if (donationAmount === 0 || donationEmail.trim().length === 0) {
            setCanSubmit(false)
        }

        else {
            setCanSubmit(true)
        }

    }, [donationAmount, donationEmail])



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
                personName: userName,
                donationName: donationSubmitName,
                donationEmail: donationEmail,
                donationPhoneNumber: donationPhoneNumber,
                donationDateTime: new Date(), 
                linkGuid: linkGuid
            }).then((response) => {
                const session = response.data
                console.log(session)
                stripe?.redirectToCheckout({ sessionId: session })
            })
            .catch((error) => { console.log("There was an error", error) })


    }
    function updateMealsTextField(value: any) {
        setDonationAmount(value);
    }


    return (
        <>
            <Box sx={{ display: 'grid', margin: 'auto', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '10px', width: '215px', }}>
                <Button onClick={() => updateMealsTextField(100)}>100 Meals</Button>
                <Button onClick={() => updateMealsTextField(200)}>200 Meals</Button>
                <Button onClick={() => updateMealsTextField(300)}>300 Meals</Button>
                <Button onClick={() => updateMealsTextField(800)}>800 Meals</Button>
                <Button onClick={() => updateMealsTextField(1000)}>1000 Meals</Button>
                <Button onClick={() => updateMealsTextField(2000)}>2000 Meals</Button>
            </Box>
            <form onSubmit={handleSubmit} style={{ justifyContent: 'center' }}>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        id="meals-textfield"
                        label="Meals"
                        type="number"
                        required={true}
                        InputLabelProps={{
                            shrink: true,

                        }}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        variant="filled"
                        value={donationAmount}

                        onChange={(e) => { setDonationAmount(Number(e.target.value)) }}
                    />
                </Box>
                <br></br>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        id="name"
                        label="Name you want on donation"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        variant="filled"
                        defaultValue={localStorage.getItem("LoggedInUser")}
                        onChange={(e) => setDonationSubmitName(e.target.value)}
                    />
                </Box>
                <br></br>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        required={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        variant="filled"
                        defaultValue={localStorage.getItem("LoggedInEmail")}
                        onChange={(e) => { setDonationEmail(e.target.value) }}
                    />
                </Box>
                <br></br>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        id="PhoneNumber"
                        label="Phone Number"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        variant="filled"
                        onChange={(e) => setDonationPhoneNumber(e.target.value)}
                    />
                </Box>

                <br></br>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {canSubmit ?
                        <Button
                            variant='contained'

                            sx={{ backgroundColor: "orange" }}>
                            Donate Now
                        </Button>
                        : <Button
                            disabled={true}
                            sx={{ backgroundColor: "orange" }}>
                            Donate Now
                        </Button>}
                </Box>

            </form>

        </>
    );
}

export default PaymentForm;


