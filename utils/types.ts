import { Outcome, VirtualFloor } from "lib/generated/graphql";
import { RoomEventInfo } from "lib/contracts";
import { PaymentToken as PaymentTokenEntity } from "lib/graph";
import { BigNumber, BigNumberish, ContractReceipt } from 'ethers';

export interface NetworkResponse {
  name: string;
  explorerName: string;
  explorerLink: string;
  symbol: string;
}

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
  WalletLink = 'WalletLink',
}
export interface VirtualFloorVars {
  virtualFloorId: string;
}

export interface VirtualFloorData {
  virtualFloors: VirtualFloor[];
}

export interface OutcomeData extends Outcome {
  color?: string;
}

export interface StatusMessage {
  show: boolean;
  type: string;
  message: string
}

export interface Bet extends Outcome {
  color: string
}

export interface BetCreationForm {
  selectedPaymentToken: string;
  paymentTokens?: PaymentTokenEntity[];
  title: RoomEventInfo["title"];
  category: RoomEventInfo["category"];
  subCategory: RoomEventInfo["subcategory"];
  description: RoomEventInfo["description"];
  opponents: RoomEventInfo["opponents"];
  outcomes: RoomEventInfo["outcomes"];
  resultSources: RoomEventInfo["resultSources"];
  isListed: RoomEventInfo["isListed"];
  multiplier: number | string;
  rake: BigNumberish | string;
  minimumBet: BigNumberish | string;
  maximumBet: BigNumberish | string;
  startingPot: BigNumberish | string;
  tOpen: BigNumberish | string;
  tClose: BigNumberish | string;
  tResolve: BigNumberish | string;
}