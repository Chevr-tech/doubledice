import {
  VirtualFloor, VirtualFloorInternalState as VirtualFloorEntityState
 } from "lib/graph";
import { currentUnixTime } from "./helpers";

export const isRunning = (virtualFloor: VirtualFloor): boolean => {
  return (
    virtualFloor.state === VirtualFloorEntityState.RunningOrClosedResultNone &&
    currentUnixTime() < Number(virtualFloor.tClose)
  );
};

export const isClosed = (virtualFloor: VirtualFloor): boolean => {
  return (
    virtualFloor.state === VirtualFloorEntityState.RunningOrClosedResultNone &&
    currentUnixTime() >= Number(virtualFloor.tClose)
  );
};

export const BetState = {
  RunningOrClosedResultNone__LtClose: "RunningOrClosedResultNone__LtClose",
  RunningOrClosedResultNone__LtSetMin: "RunningOrClosedResultNone__LtSetMin",
  RunningOrClosedResultNone__GteSetMin: "RunningOrClosedResultNone__GteSetMin",
  RunningOrClosedResultSet__LteResultChallengeMax: "RunningOrClosedResultSet__LteResultChallengeMax",
  RunningOrClosedResultSet__GtResultChallengeMax: "RunningOrClosedResultSet__GtResultChallengeMax",
  RunningOrClosedResultChallenged: "RunningOrClosedResultChallenged",
  Closed: "Closed",
}

export const handleSetBetState = (virtualFloor: VirtualFloor) => {

  let uiState = "";
  const currentTime = currentUnixTime();

  if (virtualFloor.state === VirtualFloorEntityState.RunningOrClosedResultNone) {
    if (currentTime < Number(virtualFloor.tClose)) {
      uiState = BetState.RunningOrClosedResultNone__LtClose; // Bet Still running
    } else if (currentTime > Number(virtualFloor.tClose) && currentTime < Number(virtualFloor.tResultSetMin)) {
      uiState = BetState.RunningOrClosedResultNone__LtSetMin; // Bet just closed
    } else if (currentTime > Number(virtualFloor.tResultSetMin) && currentTime <= Number(virtualFloor.tResultSetMax)) {
      uiState = BetState.RunningOrClosedResultNone__GteSetMin; // Waiting for creator to resolve bet
    }
  } else if (virtualFloor.state === VirtualFloorEntityState.RunningOrClosedResultSet) {
    if (currentTime <= Number(virtualFloor.tResultChallengeMax)) {
      uiState = BetState.RunningOrClosedResultSet__LteResultChallengeMax // Waiting fo challengers
    }
    if (currentTime > Number(virtualFloor.tResultChallengeMax)) {
      uiState = BetState.RunningOrClosedResultSet__GtResultChallengeMax // After complaint have expired
    }
  } else if (virtualFloor.state === VirtualFloorEntityState.RunningOrClosedResultChallenged) {
    uiState = BetState.RunningOrClosedResultChallenged // Bet have been challenged
  }else {
    uiState = BetState.Closed
  }

  return uiState;

}