import React from 'react';

// Next
import Image from 'next/image'
import Link from 'next/link'

// Utils
import getImageUrl from 'utils/getImageUrl'

// Components
import * as S from './StyledComponents'
import TimeZoneSwitcher from './components/TimeZoneSwitcher'
import Links from './components/Links'
import ConnectWallet from './components/ConnectWallet';

interface optionI {
  value: string
  label: string
}

const Navbar = () => {
  return (
    <S.NavbarContainer>
      <S.Main>
        <S.ImageContainer>
          <Link href="/">
            <a>
              <Image
                src={getImageUrl('/imgs/doubleDiceLogo.png', true)}
                alt="Logo"
                layout="fill"
                objectFit="cover"
                loading='lazy'
              />
            </a>
          </Link>
        </S.ImageContainer>
        <Links />
        <TimeZoneSwitcher />
        <ConnectWallet />
      </S.Main>
    </S.NavbarContainer>
  )
}

export default Navbar