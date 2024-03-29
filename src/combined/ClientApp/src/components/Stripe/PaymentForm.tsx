import React, { useContext, useEffect, useState } from 'react'
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { EventContext } from '../../App';

interface Props {
    personGUID?: string;
}

const PaymentForm: React.FC<Props> = (props) => {

    const stripe = useStripe()
    const { currentEvent } = useContext(EventContext);

    const [donationAmount, setDonationAmount] = useState<number>(0)
    const [teamId, setTeamId] = useState<number>()
    const [teamName, setTeamName] = useState<string>('')
    const linkGuid = props.personGUID
    const [userId, setUserId] = useState<string | number | null | undefined>(null);
    const [canSubmit, setCanSubmit] = useState<boolean>(false)

    const [donationSubmitName, setDonationSubmitName] = useState<string | null>('')
    const [donationEmail, setDonationEmail] = useState<string | null>('')
    const [donationPhoneNumber, setDonationPhoneNumber] = useState<string>('')

    const BaseUrl = process.env.PUBLIC_URL
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };

    const getUser = async () => {
        await axios.get(BaseUrl + '/api/user', config).then((response) => {
            setUserId(response?.data?.id)
        }).catch((error) => {
        })
    }
    const getTeam = async () => {
        await axios.get(BaseUrl + '/api/PersonTeamAssociation/' + userId + '/' + currentEvent.id).then((response) => {
            setTeamId(response.data.id)
        }).catch((error) => {
        })
    }

    const getTeamName = async () => {
        await axios.get(BaseUrl + '/api/teams/' + teamId).then((response) => {
            setTeamName(response.data.name)
        }).catch((error) => {
            setTeamName("Default")
        })
    }

        const serviceCalls = async () => {
            await getUser()
            if (linkGuid !== "" && userId === null) {
                console.log(linkGuid)
                setTeamName("Default")

            }
            else {

                await getTeam()
                await getTeamName()
            }
        }

        if (donationAmount === 0 || donationEmail!.trim().length === 0) {
            setCanSubmit(false)
        }

        else {
            setCanSubmit(true)
        }
        serviceCalls()

    }, [teamId, BaseUrl, linkGuid, userId, donationAmount, donationEmail, currentEvent])


    useEffect(() => {
        setDonationSubmitName(localStorage.getItem("LoggedInUser"))
        setDonationEmail(localStorage.getItem("LoggedInEmail"))
    }, [])



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await axios.post(`${BaseUrl}/api/stripe`,
            {
                amount: (donationAmount * 100),
                id: "paymentid",
                teamName: teamName,
                teamId: teamId,
                personId: userId,
                personName: donationSubmitName,
                donationName: donationSubmitName,
                donationEmail: donationEmail,
                donationPhoneNumber: donationPhoneNumber,
                linkGuid: linkGuid
            }).then((response) => {
                const session = response.data
                console.log(session)
                stripe?.redirectToCheckout({ sessionId: session })
            })
            .catch((error) => { console.log("There was an error", error) })


    }
    function updateDollarAmmountTextField(value: any) {
        setDonationAmount(value);
    }

    return (
        <>
            <Typography sx={{display:'flex', justifyContent:'center', mb:2}}>Every $5 donated is equivalent to 1 meal</Typography>
            <Box sx={{ display: 'grid', margin: 'auto', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '10px', width: '215px', }}>
                <Button className="DonationAmountButton" onClick={() => updateDollarAmmountTextField(1)}>$1</Button>
                <Button className="DonationAmountButton" onClick={() => updateDollarAmmountTextField(5)}>$5</Button>
                <Button className="DonationAmountButton" onClick={() => updateDollarAmmountTextField(10)}>$10</Button>
                <Button className="DonationAmountButton" onClick={() => updateDollarAmmountTextField(20)}>$20</Button>
                <Button className="DonationAmountButton" onClick={() => updateDollarAmmountTextField(50)}>$50</Button>
                <Button className="DonationAmountButton" onClick={() => updateDollarAmmountTextField(100)}>$100</Button>
            </Box>
            <form onSubmit={handleSubmit} style={{ justifyContent: 'center' }}>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <TextField
                        id="meals-textfield"
                        label="$ to donate"
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
                            className="DonationSubmitButton"
                            type='submit'
                        >
                            Donate Now
                        </Button>
                        : <Button
                            disabled={true}
                            className="DonationSubmitButton"
                            type='submit'

                        >
                            Donate Now
                        </Button>}
                </Box>

            </form>

        </>
    );
}

export default PaymentForm;