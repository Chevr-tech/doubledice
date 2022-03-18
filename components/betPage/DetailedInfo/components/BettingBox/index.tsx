import { useEffect, useLayoutEffect, useState } from "react";

// Components
import * as S from "./StyledComponents";
import * as SC from "../../StyledComponents";
import { useWeb3React } from "@web3-react/core";
import MessageBox from "components/shared/messageBox";
import StepComponent from "components/shared/StepComponent";
import WeightedBet from "./components/WeightedBet";
import InputBet from "./components/InputBet";
import { toast } from "react-toastify";
import ConfirmButton from "../ConfirmButton";
// @ts-ignore
import swal from "@sweetalert/with-react";

// Utils
import { calculateBeta, convertNumToBigInt, getNetwork, maxInt, showError, ZERO } from "utils/helpers";
import { addNetwork, injected, switchNetwork } from "connectors";
import { increaseAllowance } from "web3Api/tokenContract";
import { commitToVirtualFloor } from "web3Api/platformContract";
import { BigNumber as BigDecimal } from "bignumber.js";
import { BigNumber as BigInteger } from "ethers";

// Types
import { Bet, StatusMessage } from "utils/types";
import networkConfig from "config/networkConfig";

interface PropsI {
  chosenBet: Bet | null;
}

const BettingBox = ({ chosenBet }: PropsI) => {
  const { active, activate, library, chainId } = useWeb3React();
  const [inputValue, setInputValue] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const [statusMessage, setStatusMessage] = useState<StatusMessage>({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    (async () => {
      if (active && chainId !== networkConfig.networkId) {
        await addNetwork(networkConfig.networkId); 
        await switchNetwork();
      }
    })();
  }, [chainId]);

  useLayoutEffect(() => {
    if (!active) {
      setStep(1);
    }
    if (active && chainId !== networkConfig.networkId) {
      setStep(2);
    }
  }, [active]);

  const makeBetSuccessMsg = (hash: string) => {
    return swal(
      <div>
        <p>
          Commitment successful. {" "}
          <a
            href={`${getNetwork(networkConfig.networkId).explorerLink}/tx/${hash}`}
            style={{ color: "blue" }}
          >
            Transaction hash
          </a>
        </p>
      </div>
    );
  };

  const makeBet = async (): Promise<void> => {
    try {
      if (!active) {
        await activate(injected);
        setStep(2);
        return;
      }

      if (!chosenBet) {
        toast.error("Please select a betting option");
        return;
      }

      if (inputValue == "") {
        toast.error("Please enter your betting amount");
        return;
      }

      const bigDecimalAmount = new BigDecimal(inputValue);

      if (bigDecimalAmount.lt(chosenBet.virtualFloor.minCommitmentAmount)) {
        toast.error(
          `Minimum bet amount must be equal to or greater than ${chosenBet.virtualFloor.minCommitmentAmount}`
        );
        return;
      }

      if (bigDecimalAmount.gt(chosenBet.virtualFloor.maxCommitmentAmount)) {
        toast.error(
          `Maximum bet amount must be equal to or less than ${chosenBet.virtualFloor.maxCommitmentAmount}`
        );
        return;
      }

      if (library && chosenBet) {
        const accountSigner = library.getSigner();

        const amount = convertNumToBigInt(
          10,
          chosenBet.virtualFloor.paymentToken.decimals,
          inputValue
        );

        if (amount.lte(ZERO)) {
          toast.error("Please add an amount");
          return;
        }

        setIsLoading(true);

        setStep(2);
        await increaseAllowance(
          accountSigner,
          maxInt,
          chosenBet.virtualFloor.paymentToken.address
        );

        const chosenBetIndex = Number(chosenBet.index) - 1;
        setStep(3);
        const hash = await commitToVirtualFloor(
          accountSigner,
          amount,
          chosenBet.virtualFloor.id,
          chosenBetIndex
        );

        if (hash) {
          setStep(4);
          setIsLoading(false);
          setStatusMessage({
            show: true,
            type: "success",
            message: "Commitment successful",
          });
          makeBetSuccessMsg(hash);
        }
      }
    } catch (error: any) {
      const { shortMessage, longMessage } = showError(error);
      setStatusMessage({ show: true, type: "error", message: shortMessage });
      setIsLoading(false);
      console.error(longMessage);
      console.error(error);
    }
  };

  let beta;
  if (chosenBet) {
    beta = calculateBeta(
      Number(chosenBet.virtualFloor.tOpen),
      Number(chosenBet.virtualFloor.tClose),
      chosenBet.virtualFloor.betaOpen
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>Bet on</S.HeaderTitle>
      </S.Header>
      <S.Main>
        <S.InputContainer>
          <InputBet
            chosenBet={chosenBet}
            setInputValue={setInputValue}
            inputValue={inputValue}
          />
          <WeightedBet chosenBet={chosenBet} inputValue={inputValue} />
        </S.InputContainer>
        <ConfirmButton
          disabled={isLoading}
          onClick={makeBet}
          title="Make a bet"
          isLoading={isLoading}
          active={active}
        />
        <StepComponent step={step} title="Make bet" />
        {statusMessage.show && (
          <MessageBox
            type={statusMessage.type}
            message={statusMessage.message}
          />
        )}
      </S.Main>
    </S.Container>
  );
};

export default BettingBox;
