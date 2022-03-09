import { styled } from '@mui/material/styles';
import { Modal, Box, Backdrop, Fade, Button, Typography } from '@mui/material'

interface Props {
  openModal: boolean
  closeModal: () => void
  bodyMessage: string
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
  border: '2px solid #000',
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)', // tslint:disable-line
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
})

const ErrorModal = ({ openModal, closeModal, bodyMessage }: Props) => {

  const handleClose = () => {
    closeModal()
  }

  return (
    <>
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
              <Typography variant="h4" color="error">
                Oops!
              </Typography>
              <Typography variant="body1" color="error">
                {bodyMessage}
              </Typography>
            </StyledDiv>
            <Button variant="contained" color="error" onClick={() => closeModal()}>
              Close
            </Button>
          </StyledBox>
        </Fade>
      </StyledModal>
    </>
  )
}

export default ErrorModal