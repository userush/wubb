import { PRIZE_AMOUNT_INT, PRIZE_AMOUNT_TEXT, TICKET_PRICE } from "shared/constants";
import { toUSDCurrencyString } from "./GameTicket/utils";

export const _GameticketContent = {
  heading: `Win the Grand Prize - ${PRIZE_AMOUNT_TEXT} BUSD !`,
  intro: `Enter the game with ${parseFloat(TICKET_PRICE)} BUSD/USDT`,
  winOutcome: `One lucky player will win ${PRIZE_AMOUNT_TEXT} Dollar worth of BUSD`,
  loseOutcome: `Rest of players can still withdraw their ${toUSDCurrencyString(
    parseFloat(TICKET_PRICE)
  )} or use it for the next game`,
  prevPrice: toUSDCurrencyString(PRIZE_AMOUNT_INT),
  entryPrice: parseFloat(TICKET_PRICE),
};
