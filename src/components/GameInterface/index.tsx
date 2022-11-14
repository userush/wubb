import { Contract, ethers } from "ethers";
import { useContext } from "react";
import { Tab } from "@headlessui/react";

import GameNav from "./GameNav";
import GameTicket from "./GameTicket";
import GameDashboard from "./GameDashboard";

import {
  approvePayment,
  copyToClipboard,
  participationsToFee,
  getAccBalances,
  tokenContractFromAddress,
  playerParticipate,
  syncChainUpdates,
  claimRewards,
} from "./utils";
import { _GameticketContent } from "./constants";
import { TICKET_PRICE } from "shared/constants";
import { Web3AppContext } from "context/Web3";
import { GameContext } from "context/Game";
import { toast } from "react-toastify";

const GameInterface = () => {
  const { provider, currAccount, contracts } = useContext(Web3AppContext);

  const {
    gameID,
    playerData,
    minParticipants,
    currParticipants,
    playerParticipations,
    handleUserGameUpdates,
  } = useContext(GameContext);

  const playerHasBalance = async (
    tokenContract: Contract,
    tokenDecimals: number
  ) => {
    const { accBalanceBNB, accBalanceToken } = await getAccBalances({
      provider: provider!,
      currAccount: currAccount!,
      tokenContract: tokenContract,
      tokenDecimals: tokenDecimals,
    });

    if (!accBalanceBNB || !accBalanceToken) return false;
    return true;
  };

  const approve = async (tokenContract: Contract, tokenDecimals: number) => {
    const isApproved = await approvePayment(
      tokenContract,
      ethers.utils.parseUnits(TICKET_PRICE, tokenDecimals)
    );
    if (isApproved) {
      return true;
    } else {
      return false;
    }
  };

  const participate = async (tokenAddr: string, tokenDecimals: number) => {
    const tokenContract = tokenContractFromAddress(tokenAddr, contracts);
    const hasBalance = await playerHasBalance(tokenContract, tokenDecimals);

    if (!hasBalance) {
      toast.error("Not enough Balance");
      return;
    }

    const isApproved = await approve(tokenContract, tokenDecimals);

    if (isApproved) {
      await playerParticipate({
        player: playerData!,
        tokenAddress: tokenAddr,
        gameContract: contracts.chainPrizes!,
        currFeePrice: participationsToFee(playerParticipations),
        ticketPrice: ethers.utils.parseUnits(TICKET_PRICE, tokenDecimals),
      });
      const gameUpdates = await syncChainUpdates({
        gameContract: contracts.chainPrizes!,
        currGameID: gameID,
        player: playerData!,
      });
      handleUserGameUpdates!(
        gameUpdates.playerParticipations,
        gameUpdates.currParticipants,
        gameUpdates.playerData
      );
    }
  };

  const handleParticipate = (tokenAddr: string, tokenDecimals: number) => {
    participate(tokenAddr, tokenDecimals).catch((err) => console.log(err));
  };

  const handleCopyToClipboard = (str: string) => {
    copyToClipboard(str);
  };

  const handleClaim = (amount: number) => {
    claimRewards({
      gameAddr: contracts.chainPrizes!.address,
      tokenContract: contracts.BUSD!,
      player: currAccount!,
      amount,
    }).catch((err) => console.log(err));
  };

  return (
    <Tab.Group defaultIndex={1}>
      <GameNav />
      <Tab.Panels className="mt-1-75">
        <GameDashboard
          currAccount={currAccount}
          handleCopyToClipboard={handleCopyToClipboard}
          handleClaim={handleClaim}
        />
        <GameTicket
          title={`1$ Game \nTicket`}
          cover={"https://source.unsplash.com/yJpjLD3c9bU"}
          content={_GameticketContent}
          disabled={!currAccount}
          handleClick={handleParticipate}
          minParticipants={minParticipants}
          currParticipants={currParticipants}
        />
      </Tab.Panels>
    </Tab.Group>
  );
};

export default GameInterface;
