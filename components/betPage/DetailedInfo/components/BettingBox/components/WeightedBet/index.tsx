import { useRef, useState } from "react"

// Components
import * as S from "./StyledComponents"
import InfoModal from 'components/shared/infoModal'

// Utils
import { calculateBeta, } from "utils/helpers"

// Types
import { Bet } from "utils/types"

interface PropsI {
  chosenBet: Bet | null
  inputValue: string
}

const BettingBox = ({ chosenBet, inputValue }: PropsI) => {
  const [isMouseOverWeightedBet, setIsMouseOverWeightedBet] = useState<boolean>(false);

  let beta;
  if (chosenBet) {
    beta = calculateBeta(
      Number(chosenBet.virtualFloor.tOpen),
      Number(chosenBet.virtualFloor.tClose),
      chosenBet.virtualFloor.betaOpen
    );
  }

  let weightedBet: string = beta ? `${Number(inputValue) * Number(beta.toFixed(6))}` : '0';
  if (!isMouseOverWeightedBet && weightedBet.length > 10) weightedBet = `${weightedBet.slice(0, 10)}...`

  return (
    <S.RatioContainer>
      <S.TitleContainer>
        <S.Title>Weighted Bet</S.Title>
        <InfoModal
          description='This shows the time incentivized bet value. The amount you bet
          multiplied by the Multiplier is weighted bet. All rewards at end
          of bet are distributed in the ratios of these weighted bets.
          Hence the sooner you bet the higher your weighted bet. '
        />
      </S.TitleContainer>
      <S.CalculatedNumberContainer
        onMouseOver={() => setIsMouseOverWeightedBet(true)}
        onMouseLeave={() => setIsMouseOverWeightedBet(false)}
      >
        <S.CalculatedNumber readOnly={true} value={weightedBet} />
        <S.InputPostFix>
          {chosenBet && chosenBet.virtualFloor.paymentToken.symbol}
        </S.InputPostFix>
      </S.CalculatedNumberContainer>
    </S.RatioContainer>
  );
};

export default BettingBox;
