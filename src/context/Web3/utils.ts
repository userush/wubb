import { DAPP_STORAGE_KEY, isBrowser } from "shared/constants";
import { IStorageParams } from "./types";

export const setSessionStorageNewAcc = ({
  account,
  isApproved,
}: IStorageParams) => {
  if (!isBrowser) return;
  const newData = { account, isApproved };
  sessionStorage.setItem(DAPP_STORAGE_KEY, JSON.stringify(newData));
};

export const mmAlertLogger = () => {
  console.log(
    "%cPlease install MetaMask extension from https://metamask.io",
    "font-weight: bold; font-size: 16px;color:yellow"
  );
};
