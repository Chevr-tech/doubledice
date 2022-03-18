import { useEffect, useState } from "react";

// Utils
import { BetState, handleSetBetState, isRunning } from "utils/betState";
import { calculateBeta } from "utils/helpers";
import { useWeb3React } from "@web3-react/core";

// Components
import Analysis from "./components/Analysis";
import Header from "./components/Header";
import Sources from "./components/Sources";
import Multiplier from "./components/Multiplier";
import TimeRemaining from "./components/TimeRemaining";
import BetOptions from "./components/BetOptions";
import BettingBox from "./components/BettingBox";
import ChallengeResultsBox from "./components/ChallengeResultsBox";
import AdminChoosesResultButton from "./components/AdminChoosesResultButton";
import UserConfirmsResultButton from "./components/UserConfirmsResultButton";
import * as S from "./StyledComponents";


// GraphQl
import {
  Outcome,
  VirtualFloor,
} from "lib/graph";
import client from "config/apolloConfig";
import { USER_BET_INFO } from "graphql/queries";
import { gql } from "@apollo/client";

// Types
import { Bet } from "utils/types";

interface PropsI {
  virtualFloor: VirtualFloor;
}

const colors = [
  "Red",
  "Green",
  "Yellow",
  "Blue",
  "Orange",
  "Purple",
  "Cyan",
  "Magenta",
  "Lime",
  "Pink",
  "Teal",
  "Lavender",
  "Brown",
  "Beige",
  "Maroon",
  "Mint",
];

const BetPageComponent = ({ virtualFloor }: PropsI) => {
  const { account } = useWeb3React();
  const [section, setSection] = useState<string>("Bets analysis");
  const [chosenBet, setChosenBet] = useState<Bet | null>(null);
  const [winningBet, setWinningBet] = useState<Bet | null>(null);
  const [userWinningOutcome, setUserWinningOutcome] = useState<Outcome | null>(null);
  const [data, setData] = useState<Bet[]>([]);
  const [betState, setBetState] = useState<string>("");


  function handleSetWinningBet(newData: Bet[]) {
    if (virtualFloor.winningOutcome) {
      setWinningBet(newData[virtualFloor.winningOutcome.index]);
    } else setWinningBet(null);
  }

  // TODO: index should not be added in the front end
  // A color is added to each data array
  useEffect(() => {
    if (virtualFloor) {
      const newData = virtualFloor.outcomes.map((d, i) => {
        const colorIndex = i % 16;
        return { ...d, color: colors[colorIndex], index: d.index + 1 };
      });
      setBetState(handleSetBetState(virtualFloor));
      setData(newData);
      setChosenBet(newData[0]);
      handleSetWinningBet(newData);
      const newBetStateInterval = setInterval(function () {
        setBetState(handleSetBetState(virtualFloor));
      }, 1000);

      return () => clearInterval(newBetStateInterval);
    }
  }, [virtualFloor]);

  useEffect(() => {
    (async () => {
      if (account && virtualFloor && virtualFloor.winningOutcome) {
        const query = await client.query({
          query: gql(USER_BET_INFO),
          variables: {
            user: account.toLowerCase(),
            virtualFloorId: virtualFloor.id,
          },
        });
        const userInfo = query.data.virtualFloors;
        setUserWinningOutcome(
          userInfo[0].outcomes[virtualFloor.winningOutcome.index]
        );
      }
    })();
  }, [virtualFloor, account]);

  let renderSection;

  switch (section) {
    case "Bets analysis":
      renderSection = (
        <Analysis data={data} chosenBet={chosenBet} winningBet={winningBet} />
      );
      break;
    case "Source":
      renderSection = <Sources sources={virtualFloor.resultSources} />;
      break;
    default:
      renderSection = (
        <Analysis data={data} chosenBet={chosenBet} winningBet={winningBet} />
      );
      break;
  }

  let header;
  
  switch (betState) {
    case BetState.RunningOrClosedResultNone__LtClose:
      header = (
        <S.HeaderContainer>
          <Multiplier virtualfloor={virtualFloor}/>
          <TimeRemaining endTime={Number(virtualFloor.tClose)} />
        </S.HeaderContainer>
      );
      break;
    case BetState.RunningOrClosedResultNone__LtSetMin:
      header = (
        <S.HeaderContainer>
          <S.Title>No more bets are possible. Awaiting results.</S.Title>
        </S.HeaderContainer>
      );
      break;
    case BetState.RunningOrClosedResultNone__GteSetMin:
      header = (
        <S.HeaderContainer>
          <S.Title>
            {(account && account == virtualFloor.owner.id) ?
              'Awaiting result input from the Bet creator.'
              : 'Please pick the outcome of the bet.'
            }
          </S.Title>
          <TimeRemaining
            endTime={Number(virtualFloor.tResultSetMax)}
            startTime={Number(virtualFloor.tResultSetMin)}
          />
        </S.HeaderContainer>
      );
      break;
    case BetState.RunningOrClosedResultSet__LteResultChallengeMax:
      header = (
        <S.HeaderContainer>
          <S.Title>No more bets are possible. Waiting for complaint</S.Title>
          {winningBet && <S.Title>{winningBet.title}</S.Title>}
          <TimeRemaining
            endTime={Number(virtualFloor.tResultSetMax)}
            startTime={Number(virtualFloor.tResultChallengeMax)}
          />
          <S.Title>
            The outcome is: {` `}
            {winningBet && winningBet.title}
          </S.Title>
          {userWinningOutcome && account && userWinningOutcome.userOutcomes[0].totalWeightedBalance && (
            <S.Title>
              You have won{" "}
              {Number(
                userWinningOutcome.userOutcomes[0].totalWeightedBalance
              ).toFixed(2)}
            </S.Title>
          )}
        </S.HeaderContainer>
      );
      break;
    case BetState.RunningOrClosedResultChallenged:
      header = (
        <S.HeaderContainer>
          <S.Title>
            Result has been challenged by a participant. Under admin review.
          </S.Title>
        </S.HeaderContainer>
      );
      break;
    case BetState.RunningOrClosedResultSet__GtResultChallengeMax:
      header = (
        <S.HeaderContainer>
          <S.Title>The result has been unchallenged.</S.Title>
        </S.HeaderContainer>
      );
      break;
    case BetState.Closed:
      header = (
        <S.HeaderContainer>
          <S.Title>This bet is closed.</S.Title>
          <S.Title>
            The outcome is: {` `}
            {winningBet && winningBet.title}
          </S.Title>
          {userWinningOutcome && account && userWinningOutcome.userOutcomes[0].totalWeightedBalance && (
            <S.Title>
              You have won{" "}
              {Number(
                userWinningOutcome.userOutcomes[0].totalWeightedBalance
              ).toFixed(2)}
            </S.Title>
          )}
        </S.HeaderContainer>
      );
      break;
    default:
      header = <></>;
      break;
  }
  return (
    <S.Container>
      <Header
        setSection={setSection}
        section={section}
        virtualFloor={virtualFloor}
      />
      <S.Main>
        {header}
        <S.SectionContainer>{renderSection}</S.SectionContainer>
        <BetOptions
          setChosenBet={setChosenBet}
          chosenBet={chosenBet}
          betData={data}
          isBetOpen={isRunning(virtualFloor)}
          winningBet={winningBet}
        />
        {betState == BetState.RunningOrClosedResultSet__LteResultChallengeMax && (
            <ChallengeResultsBox virtualFloor={virtualFloor} />
          )}
        {betState == BetState.RunningOrClosedResultNone__LtClose && (
          <BettingBox chosenBet={chosenBet} />
        )}
        {
          account &&
          account.toLowerCase() == virtualFloor.owner.id &&
          betState == BetState.RunningOrClosedResultNone__GteSetMin && (
            <AdminChoosesResultButton chosenBet={chosenBet} />
          )
        }
        {
          betState == BetState.RunningOrClosedResultSet__GtResultChallengeMax && (
            <UserConfirmsResultButton virtualFloor={virtualFloor} />
          )}
      </S.Main>
    </S.Container>
  );
};

export default BetPageComponent;
