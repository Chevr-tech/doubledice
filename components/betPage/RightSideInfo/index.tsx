// Utils
import { VIRTUALFLOOR_POOL_AMOUNT } from "graphql/queries";
import { VirtualFloor } from "lib/graph";
import { useQuery } from "@apollo/client";
import { BigNumber as BigDecimal } from "bignumber.js";
// Components
import * as S from "./StyledComponents";

interface PropsI {
  virtualFloor: VirtualFloor;
}

const RightSideInfo = ({ virtualFloor }: PropsI) => {
  const { loading, error, data } = useQuery(VIRTUALFLOOR_POOL_AMOUNT, {
    variables: { id: virtualFloor.id },
    pollInterval: 1000,
  });
  const rake = new BigDecimal(virtualFloor.creationFeeRate).multipliedBy(100);
  return (
    <S.Container>
      <S.Title>Pool</S.Title>
      <S.Description>
        {data && data.virtualFloors && data.virtualFloors[0].totalSupply}{" "}
        <S.Span>{virtualFloor.paymentToken.symbol}</S.Span>
      </S.Description>
      <S.SubTitle>{rake.toFixed(2)}% RAKE</S.SubTitle>
    </S.Container>
  );
};

export default RightSideInfo;
