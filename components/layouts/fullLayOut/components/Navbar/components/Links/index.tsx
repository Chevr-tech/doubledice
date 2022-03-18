import React from 'react';

// Components
import VolleyBallIcon from 'public/imgs/VolleyballIcon'
import FootballIcon from 'public/imgs/FootballIcon'
import BaseballIcon from 'public/imgs/BaseballIcon'
import ThreeDotsIcon from 'public/imgs/ThreeDots'
import * as S from './StyledComponents'
import * as SC from '../../StyledComponents'


const links = [
  {
    title: 'Sports',
  },
  {
    title: 'Politics',
  },
  {
    title: 'Others',
  },
  // {
  //   title: 'Live Betting',
  // },
  // {
  //   title: 'Virtuals',
  // },
  // {
  //   title: 'Casino',
  // },
  // {
  //   title: 'Games',
  // },
  // {
  //   title: 'Poker',
  // },
  // {
  //   title: 'Football',
  //   img: <FootballIcon />
  // },
  // {
  //   title: 'Basketball',
  //   img: <VolleyBallIcon />
  // },
  // {
  //   title: 'Baseball',
  //   img: <BaseballIcon />
  // }
]

const NavbarLinks = () => {

  return (
    <S.Main>
      <S.Container>
        {links.map((link, i) => (
          <SC.Button key={link.title} style={i === 0 ? { paddingLeft: 0 } : {}}>
            {/* {link.img &&
              <S.ImageContainer>
                {link.img}
              </S.ImageContainer>
            } */}
            <S.Text>{link.title}</S.Text>
          </SC.Button>
        ))}
        {/* <SC.Button>
          <ThreeDotsIcon />
        </SC.Button> */}
      </S.Container>
    </S.Main>
  )
}

export default NavbarLinks