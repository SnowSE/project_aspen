import { Button, Modal, Box, Typography } from "@mui/material";

interface DynamicModalProps {
    open: boolean;
    close: () => void;
    message: string;
    onConfirm: () => void;
    isOkConfirm: boolean;
}

const DynamicModal = ({ open, close, message, onConfirm, isOkConfirm }: DynamicModalProps): JSX.Element => {

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
            fontWeight: 'bold',
            fontSize: '20px'
        },
        btnOk: {
            width: '100%',
            color: '#fff',
            backgroundColor: '#878a88',
            borderColor: '#adadaa',
            fontWeight: 'bold',
            fontSize: '20px'
        },
    }

    const closeDynamicModal = () => {
        close();
    };

    const handleConfirm = () => {
        onConfirm();
        closeDynamicModal();
    }

    return (
        <Box>
            <Modal
                open={open}
                onClose={close}
                aria-labelledby="dynamicModal"
                aria-describedby="dynamicModal"
            >
                {isOkConfirm ? 
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography
                        style={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold' }}
                        variant='h5'
                    >
                        {message}
                    </Typography>
                    <Box>
                        <Button
                            color='primary'
                            variant='contained'
                            style={{ ...useStyles.btnOk }}
                            size='large'
                            onClick={closeDynamicModal}
                        >
                            Ok
                        </Button>
                    </Box>
                </Box> : 
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography
                    style={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold' }}
                    variant='h5'
                >
                    {message}
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
            </Box>}
                
            </Modal>
        </Box>
    );
};

export default DynamicModal;