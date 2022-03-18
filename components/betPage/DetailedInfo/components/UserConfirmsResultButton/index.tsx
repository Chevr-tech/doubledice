import { useState } from "react"

// Components
import * as S from "./StyledComponents"
import { useWeb3React } from "@web3-react/core"
import { injected } from "connectors"
import { confirmUnchallengedResult } from "web3Api/platformContract"
import { VirtualFloor } from "lib/graph"
import { toast } from "react-toastify"
import ConfirmButton from '../ConfirmButton'
import { showError } from "utils/helpers"

interface PropsI {
  virtualFloor: VirtualFloor
}

const UserConfirmsResultButton = ({ virtualFloor }: PropsI) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { active, activate, library } = useWeb3React();
  const [step, setStep] = useState<number>(0);

  const agree = async (): Promise<void> => {
    try {
    
      if (!active) {
        await activate(injected);
        setStep(2);
        return;
      }
      if (library) {
        const accountSigner = library.getSigner();
        setIsLoading(true);
        setStep(3);
       
        const res = await confirmUnchallengedResult(
          accountSigner,
          virtualFloor.id,
        );

        if (res) {
          setStep(4);
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
        onClick={agree}
        title='Confirm the winning option'
        isLoading={isLoading}
        active={active}
      />
    </S.ButtonWrapper>
  );
};

export default UserConfirmsResultButton;
