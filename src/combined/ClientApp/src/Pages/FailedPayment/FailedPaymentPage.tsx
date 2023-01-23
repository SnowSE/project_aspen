import React from "react";
import Transaction from "../../JsModels/transaction";
import { TextField, Button } from '@mui/material';

const FailedPaymentPage = (transactionData:Transaction) => {
    const { transactionNumber, eventID, teamID, personID, date, amount, phoneNumber, email, name} = transactionData;

    return (
        <form>
            <TextField
                id="transaction-number"
                label="Transaction Number"
                value={transactionNumber}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="date-time"
                label="Date and Time"
                value={date}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="name-on-card"
                label="Name on Card"
                value={name}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="email"
                label="Email"
                value={email}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="phone-number"
                label="Phone Number"
                value={phoneNumber}
                margin="normal"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
            />
            <Button variant="contained" color="secondary">
                Retry Payment
            </Button>
        </form>
    );
};

export default FailedPaymentPage;
