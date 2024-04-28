import { Box, Modal, Button } from '@mui/material';


const ConfirmationModal = ({ open, handleClose, handleConfirm }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <div>Are you sure you want to delete this chat?</div>
                <Button onClick={handleConfirm} sx={{ position: 'relative', left: '250px', padding: '5px', color: '#00A884' }}>Yes</Button>
                <Button onClick={handleClose} sx={{ position: 'relative', left: '110px', color: 'red' }}>Cancel</Button>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal