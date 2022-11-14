import {
  IOnDetectUserActionPayload,
  IOnFirstLoadActionPayload,
  IOnGameStateLoadedActionPayload,
} from "./types";
import { GAME_ACTION_TYPES } from "./constants";

const onFirstLoad = (payload: IOnFirstLoadActionPayload) => {
  return {
    type: GAME_ACTION_TYPES.FIRST_LOAD,
    payload,
  };
};

const onGameStateLoaded = (payload: IOnGameStateLoadedActionPayload) => {
  return {
    type: GAME_ACTION_TYPES.LOADED_DATA,
    payload,
  };
};

const onDetectUser = (payload: IOnDetectUserActionPayload) => {
  return {
    type: GAME_ACTION_TYPES.DETECT_USER,
    payload,
  };
};

const onUserParticipated = (payload: any) => {
  return {
    type: GAME_ACTION_TYPES.USER_PARTICIPATED,
    payload,
  };
};

export { onFirstLoad, onGameStateLoaded, onDetectUser, onUserParticipated };
