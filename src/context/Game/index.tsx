import { User } from "@prisma/client";
import { createContext, useContext, useEffect, useReducer } from "react";

import { Web3AppContext } from "context/Web3";
import { getGameConnectsHistory, getAccGameState, getGameState } from "./utils";
import { IGameContextProviderProps, IGameVals } from "./types";
import { gameReducer, initState } from "./reducers";
import {
  onDetectUser,
  onFirstLoad,
  onGameStateLoaded,
  onUserParticipated,
} from "./actions";

export const GameContext = createContext<IGameVals>({ ...initState });

const GameContextProvider = ({ children }: IGameContextProviderProps) => {
  const [state, dispatch] = useReducer(gameReducer, initState);
  const { currAccount, contracts } = useContext(Web3AppContext);

  const handleUserGameUpdates = (
    playerParticipations: number,
    currParticipants: number,
    playerData: User
  ) => {
    dispatch(
      onUserParticipated({ playerParticipations, currParticipants, playerData })
    );
  };

  useEffect(() => {
    getGameConnectsHistory().then(({ connectsHistory }) => {
      dispatch(onFirstLoad({ connectsHistory }));
    });
  }, []);

  useEffect(() => {
    if (currAccount !== null) {
      getGameState(contracts.chainPrizes!)
        .then(({ currGameID, currParticipants }) => {
          dispatch(
            onGameStateLoaded({
              currParticipants: currParticipants,
              gameID: currGameID,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }, [currAccount, state.playerParticipations]);

  useEffect(() => {
    if (currAccount !== null) {
      getAccGameState(currAccount, contracts.chainPrizes!, contracts.BUSD!)
        .then(
          ({
            playerParticipations,
            playerRewards,
            playerIsWinner,
            playerData,
          }) => {
            dispatch(
              onDetectUser({
                playerParticipations,
                playerRewards,
                playerIsWinner,
                playerData,
              })
            );
          }
        )
        .catch((err) => console.log(err));
    }
  }, [currAccount]);

  return (
    <GameContext.Provider value={{ ...state, handleUserGameUpdates }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
