import React from 'react';
import { RWebShare } from 'react-web-share';
import { Button } from '@mui/material';

interface ShareModalProps {
    link: string
}

const ShareModal = ({ link}: ShareModalProps) => {
    return (
        <RWebShare
            data-testid={"shareModal"}
            data={{
                text: "",
                url: link,
                title: "Name of Event Here"
            }}
            onClick={() => console.log("shared successfully!")}
        >
            <Button variant='contained' className="ShareButton">SHARE NOW</Button>
        </RWebShare>
    );
}

export default ShareModal;
