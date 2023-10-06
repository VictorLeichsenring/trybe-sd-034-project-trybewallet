// src/types.ts

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type ActionType = {
  type: string,
  email?:string,
  payload?: any,
};

export interface UserState {
  email: string;
  // outras propriedades relacionadas ao usuário...
}

export interface SiglaState {
  isFetching: boolean;
  currencies: string[];
  errorMessage: string;
  // ... outros campos se necessário
}

export interface GlobalState {
  user: UserState;
  wallet: WalletState;
  sigla: SiglaState;
  // ... outros slices do estado se necessário
}

export interface WalletState {
  total: number;
  // outras propriedades relacionadas à carteira...
}

export interface RootState {
  user: UserState;
  wallet: WalletState;
  // outros slices do estado...
}

export type ReduxState = {
  isFetching: boolean,
  siglas: string[],
  errorMessage: string,
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
