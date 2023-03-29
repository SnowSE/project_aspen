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
                Benefits of Charity Teams
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
            Benefits of Joining a Charity Event Team
            </Typography>
            <Typography id="modal-modal-description" className="TeamModalDescription">
              <ul>
                <li>Joining a team for a charity event is a powerful way to maximize your impact and make a positive difference in the lives of others.</li>
                <li>When you're part of a team, you benefit from the camaraderie and collective motivation, which encourages you to contribute more generously than you might on your own.</li>
                <li>The spirit of friendly competition among teams drives each member to push their limits, resulting in a greater overall contribution to the cause.</li>
                <li>Being part of a team fosters a sense of belonging, creating a network of passionate individuals united by a common goal.</li>
                <li>By working together and leveraging each other's strengths, you not only raise more funds for the charity, but you also forge lasting connections that strengthen your community and promote a culture of giving.</li>
              </ul>
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
