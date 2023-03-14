import { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

interface DynamicModalProps {
    action: string;
    object: string;
    onConfirm: () => void;
}

const DynamicModal = ({ action, object, onConfirm }: DynamicModalProps): JSX.Element => {

    const useStyles = {
        btnYes: {
            width: '48%',
            color: '#fff',
            backgroundColor: '#28a745',
            borderColor: '#28a745',
            '&:hover': {
                color: '#fff',
                backgroundColor: '#218838',
                borderColor: '#1e7e34'
            },
            marginRight: '5px',
            fontWeight: 'bold',
            fontSize: '20px'
        },
        btnNo: {
            width: '48%',
            color: '#fff',
            backgroundColor: '#d9534f',
            borderColor: '#d43f3a',
            //float: 'right',
            fontWeight: 'bold',
            fontSize: '20px'
        },
    }

    const [openDynamicModal, setDynamicModal] = useState(false);

    const closeDynamicModal = () => {
        setDynamicModal(false);
    };

    const openModal = () => {
        setDynamicModal(true);
    }

    const handleConfirm = () => {
        onConfirm();
        closeDynamicModal();
    }

    return (
        <Box>
            <Modal
                open={openDynamicModal}
                onClose={closeDynamicModal}
                aria-labelledby=""
                aria-describedby=""
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography
                        style={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold' }}
                        variant='h5'
                    >
                        {` Are you sure you want to ${action} ${object}?`}
                    </Typography>
                    <Box>
                        <Button
                            color='primary'
                            variant='contained'
                            style={{ ...useStyles.btnYes }}
                            size='large'
                            onClick={handleConfirm}
                        >
                            Yes
                        </Button>
                        <Button
                            color='primary'
                            variant='contained'
                            style={{ ...useStyles.btnNo }}
                            size='large'
                            onClick={closeDynamicModal}
                        >
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default DynamicModal;