import { User } from "@prisma/client";
import { BigNumber, Contract, providers } from "ethers";

export interface IPPFuncParams {
  gameContract: Contract;
  tokenAddress: string;
  ticketPrice: BigNumber;
  currFeePrice: BigNumber;
  player: User;
}

export interface IGABFunctParams {
  currAccount: string;
  provider: providers.Web3Provider;
  tokenContract: Contract;
  tokenDecimals: number;
}

export interface ISCUFuncParams {
  gameContract: Contract;
  currGameID: number;
  player: User;
}

export interface ICRFuncParams {
  tokenContract: Contract;
  gameAddr: string;
  player: string;
  amount: number;
}
