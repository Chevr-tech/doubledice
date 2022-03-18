// Utils
import styled from 'styled-components'
import { confirmGreen, mirage } from 'styles/colors'


export const Container = styled.section`
  width: 95rem;
  margin: 0 auto;
  margin-bottom: 10rem;
  height: fit-content;
  background-color: ${mirage};
  border-radius: 1.2rem;
  padding: 2.4rem 0 2.7rem;
  transition: all 0.4s ease-out;

  @media only screen and (max-width: 1400px) {
    width: 70rem;
  }

  @media only screen and (max-width: 1300px) {
    width: 60rem;
  }
`

export const Main = styled.main`
  color: white;
  height: fit-content; 
`

export const SectionContainer = styled.main`
  min-height: 20rem;
`

export const HeaderContainer = styled.div`
  margin: 6rem 0 4rem;
`

export const Title = styled.h2`
  margin: 2rem 0;
  color: white;
  text-align: center;
  font-size: 2.5rem;
`

export const ConfirmButton = styled.button`
  width: 42rem;
  height: 6rem;
  border-radius: 0.5rem;
  background-color: ${confirmGreen};
  transition: all 0.4s ease-out;
  color: white;
  font-size: 1.6rem;
  font-family: 'Poppins';
  font-weight: bold;
  text-transform: uppercase;
  z-index: 20;
`