// Utils
import styled from 'styled-components'
import { boulder } from 'styles/colors';


export const Layout = styled.div`
  height: 100vh;
`

export const Main = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const Button = styled.button`
  position: absolute;
  top: 4rem;
  right: 4rem;
  width: 4.5rem;
  height: 4.5rem;
  border: 1px solid ${boulder};
  border-radius: 50%;
`;

export const LeftButton = styled.button`
  position: absolute;
  top: 4rem;
  left: 4rem;
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${boulder};
  border-radius: 50%;
  z-index: 1000;
`;

export const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  
  & svg{
    transition: all 0.2s ease-out;
  }

  &:hover svg{
    transform: scale(1.02);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 10;
`;

export const BackgroundImage = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  filter: blur(5px) brightness(0.4);
`;