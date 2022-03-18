// Utils
import styled from 'styled-components'
import { boulder } from 'styles/colors'

export const Container = styled.aside`
  position: absolute;
  left: 0rem;
  top: 40rem;
  
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

export const Description = styled.h1`
  font-size: 2.1rem;
  line-height: 2.6rem;
  color: ${boulder};
  text-transform: uppercase;
`

export const Span = styled.span`
  color: white;
`