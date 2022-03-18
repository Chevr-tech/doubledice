// Utils
import styled from 'styled-components'
import { boulder, confirmGreen } from 'styles/colors'

export const Container = styled.aside`
  position: absolute;
  right: 0;
  top: 40rem;
  text-align: right;  
  
  @media only screen and (max-width: 1300px) {
    top: 35rem;
  }
`

export const SubContainer = styled.div`
  margin-bottom: 2rem;
`

export const Title = styled.h1`
  font-size: 3.1rem;
  line-height: 2.6rem;
  color: white;
  margin-bottom: 1rem;
`

export const Description = styled(Title)`
  font-size: 2rem;
  line-height: 2.6rem;
  color: white;
  text-transform: uppercase;
  margin-bottom: 1rem;
`

export const Span = styled.span`
  color: ${confirmGreen};
`

export const SubTitle = styled.p`
  color: white;
  opacity: 0.6;
  font-family: 'Poppins';
  font-size: 1.4rem;
  line-height: 2.6rem;
`