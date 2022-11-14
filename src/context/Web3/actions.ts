import { ethers } from "ethers";
import { IWeb3Response } from "services/ethers";
import { web3ProviderActions } from "./constants";
import { IWeb3AppContextProps } from "./types";

const onDetectWallet = (payload: IWeb3AppContextProps["mmInstalled"]) => {
  return {
    type: web3ProviderActions.DETECT_WALLET,
    payload,
  };
};

const onConnectWallet = (payload: Partial<IWeb3AppContextProps>) => {
  return {
    type: web3ProviderActions.CONNECT_WALLET,
    payload,
  };
};

const onDisconnectWallet = (payload: IWeb3AppContextProps["currAccount"]) => {
  return {
    type: web3ProviderActions.DISCONNECT_WALLET,
    payload,
  };
};

const onAccountStateChanged = (
  payload: IWeb3AppContextProps["currAccount"]
) => {
  return {
    type: web3ProviderActions.ACCOUNT_STATE_CHANGED,
    payload,
  };
};

export {
  onDetectWallet,
  onConnectWallet,
  onDisconnectWallet,
  onAccountStateChanged,
};
