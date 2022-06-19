import React from 'react'
import { Box, Modal } from '@mui/material'

const AppModal = ({ open, screenWidth, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        borderRadius: screenWidth < 480 ? 0 : '20px',
        transform: 'translate(-50%, -50%)',
        width: screenWidth < 480 ? '100%' : '65%',
        height: screenWidth < 480 ? '100%' : '60%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        overflow: 'hidden'
      }}>
        {children}
      </Box>
    </Modal>
  )
}

export default AppModal