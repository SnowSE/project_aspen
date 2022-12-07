import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function TeamInfoModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button 
            onClick={handleOpen}
            id={'teamModalBtn'}
            data-testid={'teamModalBtn'}>
                Learn More About Teams
        </Button>
      <Modal
        id={'homePageTeamInfoModal'}
        data-testid={'homePageTeamInfoModal'}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
              <Box className="ModalPositionAndDetails">
            <Typography id="modal-modal-title" className="TeamInfoModalHeader">
            More About Teams
            </Typography>
            <Typography id="modal-modal-description" className="TeamModalDescription">
            This is more info about what teams are
            </Typography>
            <Box className="TeamModalClose">
                <Button 
                    fullWidth 
                    onClick={handleClose}
                    id={'closeBtn'}
                    data-testid={'closeBtn'}>
                        CLOSE
                </Button>
            </Box>
        </Box>

      </Modal>
    </div>
  );
}
