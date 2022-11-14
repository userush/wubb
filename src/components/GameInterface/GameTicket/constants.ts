import {
  BUSD_ADDRESS,
  BUSD_DECIMALS,
  USDT_ADDRESS,
  USDT_DECIMALS,
} from "shared/constants";

const _tokens = [
  { name: "BUSD", address: BUSD_ADDRESS, decimals: BUSD_DECIMALS },
  { name: "USDT", address: USDT_ADDRESS, decimals: USDT_DECIMALS },
];

const ACP_AMOUNT = 113278;

export { _tokens, ACP_AMOUNT };
