// @ts-nocheck
// Above is for until when the data given here is not coming from backend
// Next
import { ReactElement, useEffect, useState } from "react";
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
import getImageUrl from "utils/getImageUrl";



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

  console.log(data?.virtualFloors[0], "line 89");
  console.log(props, "line 93")

  const [discordWidgetHeight, setDiscordWidgetHeight] = useState<string>('300px')

  const isLaptopSmall = useMediaQuery({ query: '(max-width: 1300px)' })
  const isLaptop = useMediaQuery({ query: '(min-width: 1300px)' })

  useEffect(() => {
    let newDiscordWidgetHeight;
    if (isLaptopSmall) newDiscordWidgetHeight = '300px'
    else if (isLaptop) newDiscordWidgetHeight = '350px'
    setDiscordWidgetHeight(newDiscordWidgetHeight)
  }, [isLaptopSmall, isLaptop])

  const router = useRouter()
  const {pid} = router.query
  

  return (

    <FullLayout>
      <>
        <Head>
          <title>{data?.virtualFloors[0].title}</title>
          <meta name="description" content={data?.virtualFloors[0].description} />
          <meta name="msapplication-TileImage" content={getImageUrl(data?.virtualFloors[0].opponents[0].image)}/> 
          <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Russo+One&display=swap" rel="stylesheet" />
          <meta property="og:description" content={data?.virtualFloors[0].description} />
          <meta property="og:site_name" content="Double Dice betting"/>
          <meta property="og:title" content={data?.virtualFloors[0].title} />
          <meta name="og:image" itemProp="image" content={getImageUrl(data?.virtualFloors[0].opponents[0].image)}/>
          <meta property="og:type" content="website" />
          <meta property="og:image:type" content="image/jpeg"/>
          <meta property="og:URL" content={`https://doubledicebet.herokuapp.com/bet/${pid}`}/>
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />
          <meta property="og:image:alt" content={data?.virtualFloors[0].title} />
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