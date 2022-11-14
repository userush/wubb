import { ReactNode } from "react";
import { Contract, providers } from "ethers";
import { IWeb3Response } from "services/ethers";

export interface IWeb3AppContextProps
  extends IWeb3Response<providers.Web3Provider | null, Contract | null> {
  mmInstalled: boolean | null;
  isBSC: boolean | null;
  currAccount: string | null;
  connectAccount?(account: string | null): void;
}

export interface IWeb3AppProviderProps {
  children: ReactNode;
}

export interface IStorageParams {
  account: string | null;
  isApproved: boolean;
}
