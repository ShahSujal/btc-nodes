import { EStatus } from "./enum";

export type TSideBarTab = {
    to: string;
    icon: JSX.Element;
    label: string;
}

export type TResponseType ={
    status: EStatus;
    message: string;
}
export type TRootLayout = {
  [address: string]: Txref[];
}
export type TBalanceLayout = {
  [address: string]: BalanceResponse;
}
export type Wallet ={
    address: string;
    walletName: string;
  }
  
 export type WalletState = {
    wallets: Wallet[];
  }

  export type BalanceResponse = {
      address:             string;
      total_received:      number;
      total_sent:          number;
      balance:             number;
      unconfirmed_balance: number;
      final_balance:       number;
      n_tx:                number;
      unconfirmed_n_tx:    number;
      final_n_tx:          number;
  }
  export interface TransactionsResponse {
    address:             string;
    total_received:      number;
    total_sent:          number;
    balance:             number;
    unconfirmed_balance: number;
    final_balance:       number;
    n_tx:                number;
    unconfirmed_n_tx:    number;
    final_n_tx:          number;
    txrefs:              Txref[];
    tx_url:              string;
}

export interface Txref {
    tx_hash:          string;
    block_height:     number;
    tx_input_n:       number;
    tx_output_n:      number;
    value:            number;
    ref_balance:      number;
    confirmations:    number;
    confirmed:        Date;
    double_spend:     boolean;
    spent?:           boolean;
    spent_by?:        string;
    double_spend_tx?: string;
}