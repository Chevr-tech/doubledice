import React, { ReactChildren, ReactChild } from 'react'

// Utils
import styled from 'styled-components'
import { ebonyClay } from 'styles/colors'
import { toast, ToastContainer } from "react-toastify"

// Components
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'

// Types
import { Opponent } from "lib/graph";

const FullLayoutContainer = styled.div`
  position: relative;
  background-color: ${ebonyClay};
  height: 100vh;
  display: flex;
  justify-content: center;

  & * {
    font-family: 'Russo One';
    font-weight: 400;
  }
`

const SCBackgroundImage = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/mock/gameBackground2.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  filter: blur(5px);
`

const SCMain = styled.main`
  position: relative;
  margin-top: 10rem;
  height: calc(100% - 10rem);
  width: calc(100%);
  z-index: 10000;
  overflow-y: overlay;
  overflow-x: hidden;
  padding: 0 3rem;
  
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(206, 206, 206, 0.3);
  }

  &::-webkit-scrollbar-thumb{
    background-color: rgba(206, 206, 206, 0.8);
    border-radius: 2px;
  }
`

const SCContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  max-width: 1440px;
  margin: 0 auto;
`

interface AuxPropsI {
  children: ReactChild | ReactChildren
}

const FullLayout = ({ children }: AuxPropsI) => {

  return (
    <FullLayoutContainer>
      <Navbar />
      {/* <SideBar/> */}
      <SCMain>
        <SCContent>
          {children}
        </SCContent>
      </SCMain>
      <SCBackgroundImage />
      <ToastContainer
        autoClose={10000}
      />
    </FullLayoutContainer>
  )
}

export default FullLayout