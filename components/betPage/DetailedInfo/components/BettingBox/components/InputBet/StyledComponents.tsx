// Utils
import styled from 'styled-components'
import { alto } from 'styles/colors'

interface InputI {
    inputLength: number
}

interface TitleI {
    isExist: boolean
}

export const Container = styled.div`
    margin-right: 2rem;
    height: 9.1rem;
    width: 100%;
    margin-bottom: 2rem;
`

export const Title = styled.h6<TitleI>`
    font-size: 1.4rem;
    margin-bottom: 1rem;
    font-weight: 600;
    font-family: 'Poppins';
    color: white;
    margin-right: 1rem;
    color: ${props => props.isExist ? 'white' : 'rgba(255,255,255,0.2)'};  
`

export const SubContainer = styled.div`
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