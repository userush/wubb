import { IReducerAction } from "shared/types";
import { GAME_ACTION_TYPES } from "./constants";
import { IGameState } from "./types";

export const initState = {
  gameID: 0,
  connectsHistory: [],
  minParticipants: 455000,
  currParticipants: 0,
  playerParticipations: 0,
  playerRewards: null,
  playerIsWinner: false,
  playerData: null,
};

export const gameReducer = (
  state: IGameState = initState,
  actions: IReducerAction
) => {
  switch (actions.type) {
    case GAME_ACTION_TYPES.FIRST_LOAD:
      return {
        ...state,
        connectsHistory: actions.payload.connectsHistory,
      };
    case GAME_ACTION_TYPES.DETECT_USER:
      return {
        ...state,
        playerParticipations: actions.payload.playerParticipations,
        playerRewards: actions.payload.playerRewards,
        playerIsWinner: actions.payload.playerIsWinner,
        playerData: actions.payload.playerData,
      };
    case GAME_ACTION_TYPES.LOADED_DATA:
      return {
        ...state,
        currParticipants: actions.payload.currParticipants,
        gameID: actions.payload.gameID,
      };
    case GAME_ACTION_TYPES.USER_PARTICIPATED:
      return {
        ...state,
        currParticipants: actions.payload.currParticipants,
        playerParticipations: actions.payload.playerParticipations,
        playerData: actions.payload.playerData,
      };
    default:
      return state;
  }
};
