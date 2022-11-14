import axios from "axios";
import { toast } from "react-toastify";
import { User } from "@prisma/client";
import { BigNumber, Contract, ethers } from "ethers";

import {
  GAME_FEE_BASE,
  BUSD_ADDRESS,
  USDT_ADDRESS,
  CHAINPRIZES_ADDRESS,
  GAME_FEE_STEP,
} from "shared/constants";
import { IDappContractsProps } from "services/ethers";
import {
  ICRFuncParams,
  IGABFunctParams,
  IPPFuncParams,
  ISCUFuncParams,
} from "./type";

const tokenContractFromAddress = (
  address: string,
  contracts: IDappContractsProps<any>
) => {
  switch (address) {
    case BUSD_ADDRESS:
      return contracts.BUSD;
    case USDT_ADDRESS:
      return contracts.USDT;
    default:
      return contracts.BUSD;
  }
};

const approvePayment = async (tokenContract: Contract, amount: BigNumber) => {
  try {
    const transaction = await tokenContract.approve(
      CHAINPRIZES_ADDRESS,
      amount
    );
    await transaction.wait();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const participationsToFee = (playerParticipations: number) => {
  if (playerParticipations === 0) return ethers.utils.parseEther(GAME_FEE_BASE);
  const feeSteps = parseFloat(GAME_FEE_STEP) * playerParticipations
  const nextFee = parseFloat(GAME_FEE_BASE) + feeSteps;
  return ethers.utils.parseEther(nextFee.toFixed(5));
};

const hasFeeDiscount = (player: User | any) => {
  const playerReferralsCount = player.referred;
  const playerFeeFixtures = player.fee_fixed;

  if (playerReferralsCount === 0) return false;
  if (playerReferralsCount > playerFeeFixtures) return true;
};

const getAccBalances = async ({
  provider,
  currAccount,
  tokenContract,
  tokenDecimals,
}: IGABFunctParams) => {
  const accBalanceBNB = await provider.getBalance(currAccount);
  const accBalanceToken = await tokenContract.balanceOf(currAccount);

  return {
    accBalanceBNB: ethers.utils.formatEther(accBalanceBNB),
    accBalanceToken: ethers.utils.formatUnits(accBalanceToken, tokenDecimals),
  };
};

const playerParticipate = async ({
  gameContract,
  tokenAddress,
  currFeePrice,
  ticketPrice,
  player,
}: IPPFuncParams) => {
  const options = {
    value: hasFeeDiscount(player)
      ? ethers.utils.parseEther(GAME_FEE_BASE)
      : currFeePrice,
  };
  const txParticipation = await gameContract.participate(
    tokenAddress,
    ticketPrice,
    options
  );

  await txParticipation.wait(); // waits until tx is mined
};

const syncChainUpdates = async ({
  gameContract,
  currGameID,
  player,
}: ISCUFuncParams) => {
  const reqBody = {
    addr: player.addr,
  };
  const currAccPlays = await gameContract.playersParticipations(player.addr);
  const currPlays = await gameContract.gameIdParticipations(currGameID);
  const currPlayer = hasFeeDiscount(player)
    ? (await axios.put(`/api/connects/${player.addr}/bonus`, reqBody)).data
    : player;

  return {
    currParticipants: currPlays.toNumber(),
    playerParticipations: currAccPlays.toNumber(),
    playerData: currPlayer,
  };
};

const copyToClipboard = (str: string) => {
  if (!navigator.clipboard) {
    toast.error("Something went wrong");
    return;
  }
  navigator.clipboard.writeText(str);
  toast.success("Copied succesfuly");
};

const claimRewards = async ({
  amount,
  player,
  gameAddr,
  tokenContract,
}: ICRFuncParams) => {
  await tokenContract.transferFrom(
    gameAddr,
    player,
    ethers.utils.parseEther(amount.toString())
  );
};

export {
  playerParticipate,
  tokenContractFromAddress,
  participationsToFee,
  approvePayment,
  getAccBalances,
  copyToClipboard,
  hasFeeDiscount,
  syncChainUpdates,
  claimRewards,
};
