import { useState } from "react"

// Utils
import { SpinnerDotted } from "spinners-react"

// Components
import * as S from "./StyledComponents"

// Components
import { useWeb3React } from "@web3-react/core"
import { injected } from "connectors"
import { setResult } from "web3Api/platformContract"
import { toast } from "react-toastify"
import { Bet } from "utils/types"
import ConfirmButton from '../ConfirmButton'
import { showError } from "utils/helpers"

interface PropsI {
  chosenBet: Bet | null
}

const AdminChoosesResultButton = ({ chosenBet }: PropsI) => {
  const { active, activate, library } = useWeb3React();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setWinner = async (): Promise<void> => {
    try {
      if (!chosenBet) {
        toast.error("Please select an outcome");
        return;
      }

      if (!active) {
        await activate(injected);
        return;
      }
      if (library) {
        const accountSigner = library.getSigner();
        setIsLoading(true);
        const setWinner = await setResult(
          accountSigner,
          chosenBet.virtualFloor.id,
          chosenBet.index
        );

        if (setWinner) {
          setIsLoading(false);
          toast.success("The bet winner has been set successfully");
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      const { shortMessage, longMessage } = showError(error);
      toast.error(shortMessage);
      console.error(longMessage);
      console.error(error);
    }
  };

  return (
    <S.ButtonWrapper>
      <ConfirmButton
        onClick={setWinner}
        title='Confirm the winning option'
        isLoading={isLoading}
        active={active}
      />
    </S.ButtonWrapper>
  );
};

export default AdminChoosesResultButton
