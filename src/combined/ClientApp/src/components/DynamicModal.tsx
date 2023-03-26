import { Button, Modal, Box, Typography } from "@mui/material";

interface DynamicModalProps {
    open: boolean;
    close: () => void;
    message: string;
    onConfirm: () => void;
    isOkConfirm: boolean;
}

const DynamicModal = ({ open, close, message, onConfirm, isOkConfirm }: DynamicModalProps): JSX.Element => {

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
                            className="ModalOkButton"
                            variant='contained'
                            size='large'
                            onClick={handleConfirm}
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
                        className="YesButton"
                        variant='contained'
                        size='large'
                        onClick={handleConfirm}
                    >
                        Yes
                    </Button>
                    <Button
                        className="NoButton"
                        variant='contained'
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