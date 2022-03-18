/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface CommitmentBalanceTransferRejectionCauseWrapperInterface
  extends utils.Interface {
  contractName: "CommitmentBalanceTransferRejectionCauseWrapper";
  functions: {
    "TooLate()": FunctionFragment;
    "VirtualFloorUnresolvable()": FunctionFragment;
    "WrongState()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "TooLate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "VirtualFloorUnresolvable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WrongState",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "TooLate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "VirtualFloorUnresolvable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "WrongState", data: BytesLike): Result;

  events: {};
}

export interface CommitmentBalanceTransferRejectionCauseWrapper
  extends BaseContract {
  contractName: "CommitmentBalanceTransferRejectionCauseWrapper";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CommitmentBalanceTransferRejectionCauseWrapperInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    TooLate(overrides?: CallOverrides): Promise<[number]>;

    VirtualFloorUnresolvable(overrides?: CallOverrides): Promise<[number]>;

    WrongState(overrides?: CallOverrides): Promise<[number]>;
  };

  TooLate(overrides?: CallOverrides): Promise<number>;

  VirtualFloorUnresolvable(overrides?: CallOverrides): Promise<number>;

  WrongState(overrides?: CallOverrides): Promise<number>;

  callStatic: {
    TooLate(overrides?: CallOverrides): Promise<number>;

    VirtualFloorUnresolvable(overrides?: CallOverrides): Promise<number>;

    WrongState(overrides?: CallOverrides): Promise<number>;
  };

  filters: {};

  estimateGas: {
    TooLate(overrides?: CallOverrides): Promise<BigNumber>;

    VirtualFloorUnresolvable(overrides?: CallOverrides): Promise<BigNumber>;

    WrongState(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    TooLate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    VirtualFloorUnresolvable(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WrongState(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
