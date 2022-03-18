// Utils
import styled from 'styled-components'
import { alto, confirmGreen, ebonyClay } from 'styles/colors'

interface InputI {
    inputLength: number
}

interface TitleI {
    isExist: boolean
}

interface StepContainerI {
    isActive: boolean
}

interface CircleI {
    isActive: boolean
}

export const Container = styled.div`
    background: #1F202E;
    border-radius: 1.7rem;
    padding: 2.5rem;
    width: fit-content;
    margin: 0 auto;
    width: 47rem;
`

export const Header = styled.header`
    margin-bottom: 2.5rem;
`

export const HeaderTitle = styled.h1`
    font-size: 2.1rem;
`

export const Main = styled.main`

`

export const InputContainer = styled.div`
    margin-bottom: 2.5rem;
`

export const InputSubContainer = styled.div`
    margin-right: 2rem;
    height: 9.1rem;
    width: 100%;
    margin-bottom: 2rem;
`

export const RatioContainer = styled.div`
    width: 100%;
`

export const TitleContainer = styled.div`
    display: flex;
`

export const Title = styled.h6`
    font-size: 1.4rem;
    margin-bottom: 1rem;
    font-weight: 600;
    font-family: 'Poppins';
    color: white;
    margin-right: 1rem;
`

export const InputTitle = styled(Title) <TitleI>`
    color: ${props => props.isExist ? 'white' : 'rgba(255,255,255,0.2)'};  
`

export const InputAndRatioContainer = styled.div`
    display: flex;
    align-items: center;
`

export const InputBox = styled.div`
    display: flex;
    align-items: center;
    width: calc(100% - 9rem);
    height: 6rem;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 1.2rem 0 0 1.2rem;
    padding: 1.6rem;
    padding-right: 0;
`

export const Input = styled.input<InputI>`
    min-width: 2rem;
    width: ${props => props.inputLength > 2 ? `${props.inputLength}rem` : '2rem'};
    background: transparent;
    border: none;
    font-family: 'Poppins';
    outline: none !important;
    color: white;
    font-size: 1.6rem;

    &::-webkit-outer-spin-button,::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`

export const InputPostFix = styled.p`
    margin-left: 0.5rem;
    color: gray;
    font-size: 1.6rem;
    font-family: 'Poppins';
`

export const Ratio = styled.div`
    width: 9rem;
    height: 6rem;
    padding: 1.6rem;
    background: rgba(255, 255, 255, 0.06);
    border: none;
    border-radius: 0 1.2rem 1.2rem 0;
    font-family: 'Poppins';
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export const RatioText = styled.p`
    font-size: 1.4rem;
    letter-spacing: 0.2rem;
    color: ${alto};
`

export const CalculatedNumberContainer = styled.div`
    width: 100%;
    height: 6rem;
    border: 2px ${ebonyClay} solid;
    border-radius: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem;
`

export const CalculatedNumber = styled.input`
    background-color: transparent;
    color: gray;
    width: calc(100% - 9rem);
    font-size: 1.6rem;
    font-family: 'Poppins';
    outline: none;
    border: none;
    cursor: default;
`

export const InfoIconContainer = styled.div`
    position: relative;
`

export const InfoModalContainer = styled.div`
    position: absolute;
    top: 2rem;
    left: 2rem;
    background-color: white;
    padding: 1.5rem;
    width: 30rem;
    border-radius: 1rem;
`

export const Text = styled.p`
    color: black;
    font-family: 'Poppins';
`

export const ProgressBarContainer = styled.ul`
    position: relative;
    counter-reset: step;
    z-index: 1;
    margin: 2rem 0;
    height: 5rem;
    display: flex;
    align-items: center;
`

export const StepContainer = styled.li<StepContainerI>`
    list-style-type: none;
    width: 25%;
    float: left;
    font-size: 1rem;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    color: ${props => props.isActive ? confirmGreen : '#7d7d7d'};

  &:after {
      width: 100%;
      height: 2px;
      content: '';
      position: absolute;
      background-color: ${props => props.isActive ? confirmGreen : 'white'};
      top: 50%;
      left: -50%;
      transform: translateY(-50%);
      z-index: -1;
  }

  &:first-child:after {
      content: none;
  }
`

export const Circle = styled.div<CircleI>`
    width: 1rem;
    height: 1rem;
    line-height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0 auto;
    border-radius: 50%;
    background-color: ${props => props.isActive ? confirmGreen : 'white'};
`