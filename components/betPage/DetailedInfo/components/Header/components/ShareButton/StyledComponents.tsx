// Utils
import styled from 'styled-components'
import { charade, mirage } from 'styles/colors'
import { ModalContainer } from 'styles/GlobalStyledComponents'

interface CheckBoxI {
  checked: boolean
}

export const Container = styled.div`
  position: absolute;
  right: 6rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
`

export const SubContainer = styled.div`
  position: relative;
`

export const Modal = styled(ModalContainer)`
  position: absolute;
  right: 0;
  top: 3rem;
  width: 17rem;
  z-index: 100;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  background-color: ${charade};
  border: 1px ${mirage} solid;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  width: 100%;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
`

export const Title = styled.h3`
  color: white;
  font-size: 1.4rem;
  margin-left: 2rem;
`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
`