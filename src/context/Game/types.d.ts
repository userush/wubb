import { User } from "@prisma/client";
import { ReactNode } from "react";

export interface IGameState {
  gameID: number;
  connectsHistory: Array<User> | [];
  minParticipants: number;
  currParticipants: number;
  playerParticipations: number;
  playerRewards: number | null;
  playerIsWinner: boolean;
  playerData: User | null;
}

export interface IGameVals extends IGameState {
  handleUserGameUpdates?(
    playerParticipations: number,
    currParticipants: number,
    playerData: User,
  ): void;
}

export interface IGameContextProviderProps {
  children: ReactNode;
}

export interface IOnDetectUserActionPayload
  extends IGameState["playerParticipations"],
    IGameState["playerRewards"],
    IGameState["playerIsWinner"] {}

export interface IOnGameStateLoadedActionPayload
  extends IGameState["currParticipants"],
    IGameState["gameID"] {}

export interface IOnFirstLoadActionPayload
  extends IGameState["connectsHistory"] {}
