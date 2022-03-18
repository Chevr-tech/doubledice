import { useRef, useState } from "react";

// Components
import * as S from "./StyledComponents";

// Utils
import { calculateBeta, validateAmountPrecision } from "utils/helpers";
import { Bet } from "utils/types";

interface PropsI {
  chosenBet: Bet | null
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const InputBet = ({ chosenBet, setInputValue, inputValue }: PropsI) => {
  const inputRef = useRef<HTMLInputElement>(null);

  let beta;
  if (chosenBet) {
    beta = calculateBeta(
      Number(chosenBet.virtualFloor.tOpen),
      Number(chosenBet.virtualFloor.tClose),
      chosenBet.virtualFloor.betaOpen
    );
  }

  const handleInputChange = (e: any) => {
    if (chosenBet) {
      const correctInputValue = validateAmountPrecision(e.target.value, chosenBet.virtualFloor.paymentToken.decimals);
      setInputValue(correctInputValue);
    }
  }


  return (
    <S.Container>
      <S.Title isExist={Boolean(chosenBet?.title)}>
        {chosenBet
          ? chosenBet.title.length > 30
            ? `${chosenBet.title.slice(0, 30)}...`
            : chosenBet.title
          : "Betting on"}
      </S.Title>
      <S.SubContainer onClick={() => inputRef.current?.focus()}>
        <S.InputBox>
          <S.Input
            ref={inputRef}
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            inputLength={inputValue.length}
            min='0'
          />
          <S.InputPostFix>
            {chosenBet && chosenBet.virtualFloor.paymentToken.symbol}
          </S.InputPostFix>
        </S.InputBox>
        <S.Ratio>
          <S.RatioText>{beta ? beta.toFixed(2) : 0}X</S.RatioText>
        </S.Ratio>
      </S.SubContainer>
    </S.Container>
  );
};

export default InputBet;
