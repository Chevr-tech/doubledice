// Utils
import * as S from "./StyledComponents"
import * as SC from '../../StyledComponents'

// Components
import SelectButton from "components/shared/SelectButton"

interface PropsI {
  setSelectedPaymentToken: React.Dispatch<React.SetStateAction<string | number>>
  paymentOptionNames: string[]
  selectedPaymentToken: string | number
}

const Multiplier = ({ paymentOptionNames, setSelectedPaymentToken, selectedPaymentToken }: PropsI) => {
  return (
    <S.Wrapper>
      <SC.Title>
        Payment Options<SC.Required>*</SC.Required>
      </SC.Title>
      <SC.InputContainer>
        <SelectButton
          options={paymentOptionNames}
          setOption={setSelectedPaymentToken}
          selectedOption={selectedPaymentToken}
        />
      </SC.InputContainer>
    </S.Wrapper>
  );
};

export default Multiplier;
