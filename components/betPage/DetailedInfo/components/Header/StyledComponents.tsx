// Utils
import styled from 'styled-components'
import { ebonyClay, osloGray } from 'styles/colors'

interface ButtonI {
  selected: boolean
}

export const Container = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.4rem;
  width: 100%;
`

export const ButtonsContainer = styled.div`
  border: 1px ${ebonyClay} solid;
  border-radius: 1rem;
`

export const Button = styled.button<ButtonI>`
  padding: 1.2rem 1.6rem;
  transition: all 0.4s ease-out;
  border-radius: 0.8rem;
  background-color: ${props => props.selected ? ebonyClay : 'transparent'};
  width: 11.4rem;

  & > p{
      color: ${props => props.selected ? 'white' : osloGray};
  }

  &:hover > p{
      color: white;
  }
`

export const Text = styled.p`
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: ${osloGray};
  transition: all 0.4s ease-out;
`