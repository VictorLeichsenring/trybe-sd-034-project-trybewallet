// src/types.ts

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type ActionType = {
  type: string,
  email?:string,
};

export interface UserState {
  email: string;
  // outras propriedades relacionadas ao usuário...
}

export interface SiglaState {
  currencies: string[];
  // ... outros campos se necessário
}

export interface GlobalState {
  user: UserState;
  wallet: WalletState;
  currencies: SiglaState;
  // ... outros slices do estado se necessário
}

// export interface WalletState {
//   total: number;
//   // outras propriedades relacionadas à carteira...
// }

export interface RootState {
  user: UserState;
  wallet: WalletState;
  // outros slices do estado...
}

export type ReduxState = {
  isFetching: boolean,
  siglas: string[],
  errorMessage: string,
  wallet: WalletState;
};

export interface WalletState {
  currencies: string[];
  expenses: Expense[];
}

export interface Expense {
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates?: any; // ou um tipo mais específico dependendo da sua API
  id?: number;
}

// export interface GlobalState {
//   user: UserState;
//   wallet: WalletState;
//   // ... outros slices do estado
// }

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
