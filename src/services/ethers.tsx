import { ethers, Contract } from "ethers";

import {
  CHAINPRIZES_ADDRESS,
  BUSD_ADDRESS,
  USDT_ADDRESS,
  isProd,
} from "shared/constants";
import ChainPrizes from "contracts/ChainPrizes.json";
import BUSD_dev from "contracts/MockBUSD.json";
import USDT_dev from "contracts/MockUSDT.json";
import BUSD_prod from "contracts/BUSD.json";
import USDT_prod from "contracts/USDT.json";

export interface IDappContractsProps<T> {
  chainPrizes: T;
  BUSD: T;
  USDT: T;
}

export interface IWeb3Response<T1, T2> {
  provider: T1;
  contracts: IDappContractsProps<T2>;
}

const initWeb3 = async (): Promise<
  IWeb3Response<ethers.providers.Web3Provider | null, ethers.Contract | null>
> => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const chainPrizes = new Contract(
      CHAINPRIZES_ADDRESS as string,
      ChainPrizes.abi,
      signer
    );
    const BUSD = new Contract(
      BUSD_ADDRESS as string,
      isProd ? BUSD_prod.abi : BUSD_dev.abi,
      signer
    );
    const USDT = new Contract(
      USDT_ADDRESS as string,
      isProd ? USDT_prod.abi : USDT_dev.abi,
      signer
    );

    return {
      provider,
      contracts: { chainPrizes, BUSD, USDT },
    };
  } else {
    return {
      provider: null,
      contracts: {
        chainPrizes: null,
        BUSD: null,
        USDT: null,
      },
    };
  }
};

export default initWeb3;
