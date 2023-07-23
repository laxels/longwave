import React, { useState } from "react";
import { CenteredRow, CenteredColumn } from "../common/LayoutElements";
import { RoundPhase, Team, TeamName } from "../../state/GameState";
import { Button } from "../common/Button";
import { LongwaveAppTitle } from "../common/Title";
import { useContext } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { NewTeamGame } from "../../state/NewGame";

import { useTranslation } from "react-i18next";
import { SpectrumCard } from "../../state/BuildGameModel";

export function JoinTeamAndSubmitCustomSpectrumCards() {
  const { t } = useTranslation();
  const cardsTranslation = useTranslation("spectrum-cards");
  const { gameState, localPlayer, setGameState } = useContext(GameModelContext);

  const leftTeam = Object.keys(gameState.players).filter(
    (playerId) => gameState.players[playerId].team === Team.Left
  );
  const rightTeam = Object.keys(gameState.players).filter(
    (playerId) => gameState.players[playerId].team === Team.Right
  );

  const joinTeam = (team: Team) => {
    setGameState({
      players: {
        ...gameState.players,
        [localPlayer.id]: {
          ...localPlayer,
          team,
        },
      },
    });
  };

  const [customSpectrumCardsStr, setcustomSpectrumCardsStr] = useState(``);

  const startGame = () => {
    const customSpectrumCards = parsecustomSpectrumCardsStrSafe(
      customSpectrumCardsStr
    );
    if (customSpectrumCards == null) {
      return;
    }

    setGameState(
      NewTeamGame(
        gameState.players,
        localPlayer.id,
        gameState,
        cardsTranslation.t,
        customSpectrumCards
      )
    );
  };

  return (
    <CenteredColumn>
      <LongwaveAppTitle />

      <div>{t("jointeam.join_team")}:</div>
      <CenteredRow
        style={{
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <CenteredColumn>
          <div>{TeamName(Team.Left, t)}</div>
          {leftTeam.map((playerId) => (
            <div key={playerId}>{gameState.players[playerId].name}</div>
          ))}
          <div>
            <Button
              text={t("jointeam.join_left")}
              onClick={() => joinTeam(Team.Left)}
            />
          </div>
        </CenteredColumn>
        <CenteredColumn>
          <div>{TeamName(Team.Right, t)}</div>
          {rightTeam.map((playerId) => (
            <div key={playerId}>{gameState.players[playerId].name}</div>
          ))}
          <div>
            <Button
              text={t("jointeam.join_right")}
              onClick={() => joinTeam(Team.Right)}
            />
          </div>
        </CenteredColumn>
      </CenteredRow>

      <div style={{ marginTop: 16 }}>Custom Spectrum Cards:</div>
      <CenteredRow
        style={{
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <textarea
          style={{
            width: 300,
            height: 120,
            resize: `none`,
          }}
          placeholder={`Trashy, Classy\nDead, Alive`}
          value={customSpectrumCardsStr}
          onChange={(e) => {
            setcustomSpectrumCardsStr(e.target.value);
          }}
        />
      </CenteredRow>

      {gameState.roundPhase === RoundPhase.PickTeams && (
        <Button text={t("jointeam.start_game")} onClick={startGame} />
      )}
    </CenteredColumn>
  );
}

function parsecustomSpectrumCardsStrSafe(str: string): SpectrumCard[] | null {
  try {
    return parsecustomSpectrumCardsStr(str);
  } catch {
    alert(`Badly formatted custom spectrum cards`);
    return null;
  }
}

function parsecustomSpectrumCardsStr(str: string): SpectrumCard[] {
  return str
    .trim()
    .split(`\n`)
    .map((l) => l.trim())
    .filter((l) => l)
    .map((l) => l.split(/\s*,\s*/).map(capitalize))
    .filter(isSpectrumCard);
}

function isSpectrumCard(x: string[]): x is SpectrumCard {
  return x.length === 2;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
