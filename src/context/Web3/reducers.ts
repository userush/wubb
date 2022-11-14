import { IReducerAction } from "shared/types";
import { web3ProviderActions } from "./constants";
import { IWeb3AppContextProps } from "./types";

export const web3InitState = {
  provider: null,
  mmInstalled: null,
  currAccount: null,
  isBSC: null,
  contracts: {
    chainPrizes: null,
    BUSD: null,
    USDT: null,
  },
};

export const web3Reducer = (
  state: IWeb3AppContextProps = web3InitState,
  actions: IReducerAction
) => {
  switch (actions.type) {
    case web3ProviderActions.CONNECT_WALLET:
      return {
        ...state,
        provider: actions.payload.provider,
        contracts: actions.payload.contracts,
        isBSC: actions.payload.isBSC,
      };
    case web3ProviderActions.DETECT_WALLET:
      return { ...state, mmInstalled: actions.payload };
    case web3ProviderActions.ACCOUNT_STATE_CHANGED:
      return { ...state, currAccount: actions.payload };
    default:
      return state;
  }
};
