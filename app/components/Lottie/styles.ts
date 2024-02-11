import { styled } from '~/config';
import Lottie from 'lottie-react'

export const style = (mr?: boolean, mb?: boolean) => (
  {
    width: 24,
    height: 24,
    marginRight: mr ? 8 : 0,
    marginBottom: mb ? 10 : 0
  }
)

export const StyledLottie = styled(Lottie)
