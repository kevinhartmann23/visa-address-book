import { Backdrop, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles';

interface Props {
  open: boolean
}

const StyledBackdrop = styled(Backdrop)({
  zIndex: 8000, // to make sure it's the top element and all others are disabled
})

export default function Progress({ open }: Props) {

  return (
    <>
      <StyledBackdrop open={open}>
        <CircularProgress aria-label='Loading' color="primary" size={80} />
      </StyledBackdrop>
    </>
  )
}