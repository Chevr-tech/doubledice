import { Outcome } from 'lib/graph';
import { useRef } from 'react'
import { Bet } from 'utils/types';

// Components
import * as S from './StyledComponents'

interface PropsI {
  setChosenBet: React.Dispatch<React.SetStateAction<Bet | null>>
  chosenBet: Bet | null
  winningBet: Bet | null
  betData: Bet[]
  isBetOpen: boolean
}

const BetOptions = ({ setChosenBet, chosenBet, betData, isBetOpen, winningBet }: PropsI) => {
  const wrapperRef = useRef(null);

  let isSame = false
  if (winningBet && chosenBet) isSame = winningBet.index === chosenBet.index

  return (
    <S.Container>
      {betData.map((bet, i) => {
        let isSelected = false
        let isLose
        if (winningBet && !chosenBet) isSelected = winningBet.index - 1 === i
        else if (chosenBet) {
          if (!winningBet) isSelected = chosenBet.index - 1 === i
          else if (winningBet && isSame) isSelected = chosenBet.index - 1 === i
          else if (winningBet && !isSame) {
            isLose = chosenBet.index - 1 === i
            isSelected = winningBet.index - 1 === i
          }
        }
        return (
          <S.Box
            ref={isSelected ? wrapperRef : null}
            onClick={(e) => isBetOpen && setChosenBet(bet)}
            selected={isSelected}
            isLose={isLose}
            isBetOpen={isBetOpen}
            key={bet.title}
          >
            <S.Circle
              selected={isSelected}
              color={bet.color}
              isLose={isLose}
            />
            <S.Number>{bet.index}</S.Number>
            <S.Description>{bet.title}</S.Description>
          </S.Box>
        );
      })}
    </S.Container>
  );
};

export default BetOptions
