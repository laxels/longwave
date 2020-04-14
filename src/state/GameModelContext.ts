import { Team, GameModel, InitialGameState } from "./AppState";
import { createContext } from "react";

export const GameModelContext = createContext<GameModel>({
  state: InitialGameState(),
  localPlayer: {
    id: "localPlayer",
    name: "Player",
    team: Team.Unset,
  },
  clueGiver: null,
  setGameState: () => {},
});