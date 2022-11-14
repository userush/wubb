import axios from "axios";
import { Contract, ethers } from "ethers";

const getGameState = async (contract: Contract) => {
  const currGameID = await contract.gameId();
  const currParticipants = await contract.gameIdParticipations(currGameID);
  return {
    currGameID: currGameID.toNumber(),
    currParticipants: currParticipants.toNumber(),
  };
};

const getGameConnectsHistory = async () => {
  const connectsHistory = (await axios.get("/api/connects")).data;
  return {
    connectsHistory,
  };
};

const getPrevGameWinner = async (gameID: number, gameContract: Contract) => {
  if (gameID == 0) return false;
  const prevGameWinner = await gameContract.gameHistory(gameID - 1);
  return prevGameWinner;
};

const getAccGameState = async (
  currAccount: string,
  gameContract: Contract,
  busdContract: Contract
) => {
  const currGameID = await gameContract.gameId();
  const playerGames = await gameContract.playersParticipations(currAccount);
  const playerRewards = await busdContract.allowance(gameContract.address, currAccount);
  const prevGameWinner = await getPrevGameWinner(currGameID.toNumber(), gameContract);
  const playerData = (await axios.get(`/api/connects/${currAccount}`)).data;
  const playerIsWinner = prevGameWinner === currAccount;
  const rewardsAmount = ethers.utils.formatEther(playerRewards.toString());

  return {
    playerParticipations: playerGames.toNumber(),
    playerRewards: rewardsAmount.includes(".")
      ? parseFloat(rewardsAmount)
      : parseInt(rewardsAmount),
    playerIsWinner,
    playerData,
  };
};

export { getGameState, getGameConnectsHistory, getAccGameState };
