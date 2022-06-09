export interface GameState {
  isFinished: boolean;
  attempts: number;
}

export interface GameContextInterface extends GameState {
  reset: () => void;
  addAttempt: () => void;
  setStatus: (status: boolean) => void;
}

export enum GameStateActions {
  ADD_ATTEMPT = 'ADD_ATTEMPT',
  RESET = 'RESET',
  SET_STATUS = 'SET_STATUS',
}

export interface GameStateAction {
  type: GameStateActions;
  payload?: boolean;
}