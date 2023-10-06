export type ActionType = {
  type: string,
  email?:string,
};

export interface UserState {
  email: string;
  // outras propriedades relacionadas ao usuário...
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
