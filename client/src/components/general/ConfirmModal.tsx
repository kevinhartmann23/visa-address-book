import { styled } from '@mui/material/styles';
import { Modal, Box, Backdrop, Fade, Button, Typography } from '@mui/material'

interface Props {
  openModal: boolean
  closeModal: () => void
  bodyMessage: string
  confirm: () => void
}

const StyledModal = styled(Modal)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

const StyledDiv = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

const StyledBox = styled(Box)({
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)', // tslint:disable-line
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
})

const ConfirmationModal = ({ openModal, closeModal, bodyMessage, confirm }: Props) => {

  const handleClose = () => {
    confirm()
    closeModal()
  }

  return (
    <>
      <StyledModal
        aria-label="Action Confirmation Pop Up"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <StyledBox>
            <StyledDiv mb={3}>
              <Typography variant="h4" color='primary'>
                Are you sure?
              </Typography>
              <Typography variant="body1">
                {bodyMessage}
              </Typography>
            </StyledDiv>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-between'}}>
              <Button aria-label='cancel button' variant="contained" color='error' onClick={() => closeModal()}>
                Cancel
              </Button>
              <Button aria-label='confirm button' variant="contained" color='primary' onClick={() => handleClose()}>
                Continue
              </Button>
            </Box>
          </StyledBox>
        </Fade>
      </StyledModal>
    </>
  )
}

export default ConfirmationModal