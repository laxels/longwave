import { RandomSpectrumTarget } from "./RandomSpectrumTarget";
import { RandomFourCharacterString } from "./RandomFourCharacterString";
import { TFunction } from "react-i18next";
import { SpectrumCard } from "./BuildGameModel";

export enum RoundPhase {
  SetupGame,
  PickTeams,
  GiveClue,
  MakeGuess,
  CounterGuess,
  ViewScore,
}

export enum GameType {
  Teams,
  Cooperative,
  Freeplay,
}

export enum Team {
  Unset,
  Left,
  Right,
}

export function TeamReverse(team: Team) {
  if (team === Team.Left) {
    return Team.Right;
  }
  if (team === Team.Right) {
    return Team.Left;
  }
  return Team.Unset;
}

export function TeamName(team: Team, t: TFunction<string>) {
  if (team === Team.Left) {
    return t("gamestate.left_brain");
  }
  if (team === Team.Right) {
    return t("gamestate.right_brain");
  }
  return t("gamestate.the_player");
}

export type PlayersTeams = {
  [playerId: string]: {
    name: string;
    team: Team;
  };
};

export type TurnSummaryModel = {
  spectrumCard: [string, string];
  clueGiverName: string;
  clue: string;
  spectrumTarget: number;
  guess: number;
};

export interface GameState {
  gameType: GameType;
  roundPhase: RoundPhase;
  turnsTaken: number;
  deckSeed: string;
  deckIndex: number | null;
  spectrumTarget: number;
  clue: string;
  guess: number;
  counterGuess: "left" | "right";
  players: PlayersTeams;
  clueGiver: string;
  leftScore: number;
  rightScore: number;
  coopScore: number;
  coopBonusTurns: number;
  previousTurn: TurnSummaryModel | null;
  deckLanguage: string | null;
  customSpectrumCards: SpectrumCard[];
}

export function InitialGameState(
  deckLanguage: string | null = null
): GameState {
  return {
    gameType: GameType.Teams,
    roundPhase: RoundPhase.SetupGame,
    turnsTaken: -1,
    deckSeed: RandomFourCharacterString(),
    deckIndex: null,
    spectrumTarget: RandomSpectrumTarget(),
    clue: "",
    guess: 0,
    counterGuess: "left",
    players: {},
    clueGiver: "",
    leftScore: 0,
    rightScore: 0,
    coopScore: 0,
    coopBonusTurns: 0,
    previousTurn: null,
    deckLanguage,
    customSpectrumCards: [],
  };
}
