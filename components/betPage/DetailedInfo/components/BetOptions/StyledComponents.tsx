// Utils
import styled from 'styled-components'
import { confirmGreen, monza } from 'styles/colors'

interface BoxI {
    selected: boolean
    isLose?: boolean
    isBetOpen?: boolean
}

interface CircleI extends BoxI {
    color: string
}

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    padding: 2rem;
`

export const Box = styled.button<BoxI>`
    height: 5rem;
    background: ${props => props.selected ? confirmGreen : props.isLose ? monza : 'rgba(255, 255, 255, 0.06)'};
    border-radius: 1.2rem;
    padding: 1.2rem 1.6rem;
    transition: all 0.4s ease-out;
    display: flex;
    align-items: center;
    cursor: ${props => props.isBetOpen ? 'pointer' : 'default'};

    &:hover{
        background-color: ${props =>
        (props.selected) ? confirmGreen :
            (props.isLose) ? monza :
                (props.isBetOpen) ? 'rgba(45, 200, 91, 0.2)' :
                    'rgba(255, 255, 255, 0.06)'
    };
    }
`

export const Circle = styled.div<CircleI>`
    width: 1.2rem;
    min-width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    margin-right: 1.2rem;
    background: ${props => (props.selected || props.isLose) ? 'white' : props.color};
    transition: all 0.4s ease-out;
`

export const Number = styled.p`
    color: white;
    width: 2rem;
    margin-right: 1rem;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-family: 'Poppins';
`

export const Description = styled.p`
    color: white;
    font-family: 'Poppins';
    font-size: 1.6rem;
    line-height: 2.4rem;
    overflow-wrap: anywhere;
`