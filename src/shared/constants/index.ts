export const _APP_NAME = "WinTogetherr";

export const _APP_VERSION = "0.1.0";

export const CHAINPRIZES_ADDRESS =
  process.env.NEXT_PUBLIC_CHAINPRIZES_ADDRESS || "";

export const BUSD_ADDRESS = process.env.NEXT_PUBLIC_MOCKBUSD_ADDRESS || "";

export const USDT_ADDRESS = process.env.NEXT_PUBLIC_MOCKUSDT_ADDRESS || "";

export const BUSD_DECIMALS = 18;

export const USDT_DECIMALS = 18;

export const TICKET_PRICE = "1.75";

export const PRIZE_AMOUNT_INT = 500000;

export const PRIZE_AMOUNT_TEXT = `500.000,00`;

export const GAME_FEE_BASE = "0,0017";

export const GAME_FEE_STEP = "0,00089";

export const DAPP_STORAGE_KEY = "isDappApproved";

export const isBrowser = typeof window !== "undefined";

export const isProd = process.env.NODE_ENV !== "development";

export const HOST_NAME = isProd
  ? "https://wintogetherr.com/"
  : "http://localhost:3000/";
