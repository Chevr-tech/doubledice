// @ts-nocheck
// Above is for until when the data given here is not coming from backend
// Next
import { ReactElement, useEffect, useState, useRef } from "react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { BigNumber as BigInteger } from "ethers";
import { useRouter } from "next/router";

// Utils
import styled from "styled-components";
import { VIRTUAL_FLOORS } from "../../graphql/queries";
import DiscordWidget from "components/shared/discordWidget";
import { useMediaQuery } from 'react-responsive'
import { toHexForGraphProtocol } from "utils/helpers";

// Components
import FullLayout from "components/layouts/fullLayOut";
import DetailedInfo from "components/betPage/DetailedInfo";
import Header from "components/betPage/Header";
import LeftSideInfo from "components/betPage/LeftSideInfo";
import RightSideInfo from "components/betPage/RightSideInfo";
import PendingPage from "components/betPage/PendingPage";
import SideBar from "components/layouts/fullLayOut/components/SideBar";


const SCMain = styled.section`
  position: relative;
  width: 100%;
  padding-bottom: 5rem;
`;

const SCMainContainer = styled.main`
  position: relative;
  width: 100%;
  z-index: 10;
  max-width: 95rem;
  margin: 0 auto;
  
  @media only screen and (max-width: 1200px) {
    max-width: 70rem;
  }
  
  @media only screen and (max-width: 1100px) {
    max-width: 60rem;
  }
`;

const SCAsideWrapper = styled.main`
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100vh - 10rem);
  margin-top: 10rem;
  max-width: 1440px;
  z-index: 1;
  padding: 0 3rem;
`;

const SCAsideSubWrapper = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SCDiscordWidget = styled.div`
  position: absolute;
  left: 0rem;
  top: 2rem;
`;

interface IProps {
  id: string;
}


const BetPage = (props: IProps): ReactElement => {
  const { loading, error, data } = useQuery(VIRTUAL_FLOORS, {
    variables: { id: props.id },
    pollInterval: 1000,
  });

  console.log(data?.virtualFloors[0], "line 89")
  const [discordWidgetHeight, setDiscordWidgetHeight] = useState<string>('300px')

  const isLaptopSmall = useMediaQuery({ query: '(max-width: 1300px)' })
  const isLaptop = useMediaQuery({ query: '(min-width: 1300px)' })

  useEffect(() => {
    let newDiscordWidgetHeight;
    if (isLaptopSmall) newDiscordWidgetHeight = '300px'
    else if (isLaptop) newDiscordWidgetHeight = '350px'
    setDiscordWidgetHeight(newDiscordWidgetHeight)
  }, [isLaptopSmall, isLaptop])


  const router = useRouter();
  const {pid} = router.query
  
  const [desc, setDesc] = useState("")
  const [title, setTitle] = useState("")
  const headTag = document.querySelector("head");


  const metaDesc = document.createElement("meta")
  metaDesc.setAttribute("property", "og:description")
  metaDesc.setAttribute("content", `${data?.virtualFloors[0].description}`)
  document.getElementsByTagName("head")[0].appendChild(metaDesc)

  const metaTitle = document.createElement("meta")
  metaTitle.setAttribute("prpperty", "og:title")
  metaTitle.setAttribute("content", `${data?.virtualFloors[0].title}`)
  document.getElementsByTagName("head")[0].appendChild(metaTitle)
  const metaImg = document.createElement("meta")
  metaImg.setAttribute("name", "og:image")
  metaImg.setAttribute("itemProp", "image")
  metaImg.setAttribute("content", "https://imageurlserver.herokuapp.com/images/doubleDiceLogo.jpg")
  document.getElementsByTagName("head")[0].appendChild(metaImg)
  const metaImgWidth = document.createElement("meta")
  metaImgWidth.setAttribute("property", "og:image:width")
  metaImgWidth.setAttribute("content", "200")
  document.getElementsByTagName("head")[0].appendChild(metaImgWidth)
  const metaImgHeight = document.createElement("meta")
  metaImgHeight.setAttribute("property", "og:image:height")
  metaImgHeight.setAttribute("content", "200")
  document.getElementsByTagName("head")[0].appendChild(metaImgHeight)

  return (
    <FullLayout>
      <>
        <Head>
          <title>{data?.virtualFloors[0].title}</title>
          // <meta name="msapplication-TileImage" content="https://imageurlserver.herokuapp.com/images/doubleDiceLogo.jpg"/> 
          // <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Russo+One&display=swap" rel="stylesheet" />
          // <meta property="og:description" content={data?.virtualFloors[0].description} />
          // <meta property="og:site_name" content="Double Dice betting"/>
          // <meta property="og:title" content={data?.virtualFloors[0].title} />
          // <meta name="og:image" itemProp="image" content='https://imageurlserver.herokuapp.com/images/doubleDiceLogo.jpg'/>
          // <meta property="og:type" content="website" />
          // <meta property="og:image:type" content="image/jpeg"/>
          // <meta property="og:URL" content={`https://doubledicebet.herokuapp.com/${pid}`} />
          // <meta property="og:image:width" content="200" />
          // <meta property="og:image:height" content="200" />
          // <meta property="og:image:alt" content="double dice image" />
        </Head>
        <SCMain data-name="main-bet-page">
          {(data?.virtualFloors && data.virtualFloors.length > 0) ?
            data.virtualFloors.map((virtualfloor) => (
              <div key={virtualfloor.id}>
                <SCMainContainer>
                  <Header
                    opponents={virtualfloor.opponents}
                    title={virtualfloor.title}
                    description={virtualfloor.description}
                  />
                  <DetailedInfo virtualFloor={virtualfloor} />
                </SCMainContainer>
                <SCAsideWrapper>
                  <SCAsideSubWrapper>
                    <LeftSideInfo
                      betClose={virtualfloor.tClose}
                      betResolve={virtualfloor.tResultSetMin}
                    />
                    <RightSideInfo
                      virtualFloor={virtualfloor}
                    />
                    <SCDiscordWidget>
                      <DiscordWidget
                        channel={virtualfloor.discordChannelId}
                        style={{
                          width: "60%",
                          height: discordWidgetHeight,
                        }}
                      />
                    </SCDiscordWidget>
                  </SCAsideSubWrapper>
                </SCAsideWrapper>
              </div>
            ))
            :
            <PendingPage />
          }
        </SCMain>
      </>
    </FullLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  k: GetServerSidePropsContext
) => {
  let id = "";
  if (k.query && k.query.pid) {
    id = toHexForGraphProtocol(k.query.pid);
  }
  return {
    props: {
      id
    },
  };
};

export default BetPage;