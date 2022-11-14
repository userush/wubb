import { Contract } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect, createContext, useReducer } from "react";

import { web3InitState, web3Reducer } from "./reducers";
import { IWeb3AppContextProps, IWeb3AppProviderProps } from "./types";
import initWeb3, { IDappContractsProps } from "services/ethers";

import {
  onAccountStateChanged,
  onConnectWallet,
  onDetectWallet,
} from "./actions";
import { setSessionStorageNewAcc, mmAlertLogger } from "./utils";
import { getSessionStorageData, removeSessionStorageData } from "shared/utils";
import { DAPP_STORAGE_KEY } from "shared/constants";

export const Web3AppContext = createContext<IWeb3AppContextProps>({
  ...web3InitState,
  connectAccount: () => {},
});

const Web3AppProvider = ({ children }: IWeb3AppProviderProps) => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitState);

  const connectAccount = (account: string) => {
    dispatch(onAccountStateChanged(account));
    setSessionStorageNewAcc({ account: account, isApproved: true });
  };

  const handleAccountsChange = (accounts: string[]) => {
    if (accounts.length !== 0) {
      dispatch(onAccountStateChanged(accounts[0]));
      setSessionStorageNewAcc({ account: accounts[0], isApproved: true });
    } else if (accounts.length === 0) {
      dispatch(onAccountStateChanged(null));
      removeSessionStorageData(DAPP_STORAGE_KEY);
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      mmAlertLogger();
      dispatch(onDetectWallet(false));
    } else {
      dispatch(onDetectWallet(true));
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        console.log({ accounts });
        handleAccountsChange(accounts);
      });
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChange);
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      const { provider, contracts } = await initWeb3();
      dispatch(
        onConnectWallet({
          provider: provider as Web3Provider,
          contracts: contracts as IDappContractsProps<Contract>,
          isBSC: window.ethereum.networkVersion === 56,
        })
      );
    };

    init().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const prevSession = getSessionStorageData(DAPP_STORAGE_KEY);
    prevSession !== null &&
      dispatch(onAccountStateChanged(prevSession.account));
  }, []);

  return (
    <Web3AppContext.Provider
      value={{
        provider: state.provider,
        mmInstalled: state.mmInstalled,
        currAccount: state.currAccount,
        isBSC: state.isBSC,
        connectAccount: connectAccount,
        contracts: {
          chainPrizes: state.contracts.chainPrizes,
          BUSD: state.contracts.BUSD,
          USDT: state.contracts.USDT,
        },
      }}
    >
      {children}
    </Web3AppContext.Provider>
  );
};

export default Web3AppProvider;
