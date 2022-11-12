import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            More About Teams
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This is more info about what teams are
            </Typography>
            <Box sx={{mt:2}}>
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
