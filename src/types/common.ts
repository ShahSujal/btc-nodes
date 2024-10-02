import { EStatus } from "./enum";

// Sidebar type
export type TSideBarTab = {
    to: string;
    icon: JSX.Element;
    label: string;
}

// Response type for all API calls
export type TResponseType ={
    status: EStatus;
    message: string;
}

//  Get all transactions from address
export type TRootLayout = {
  [address: string]: Txref[];
}
// Get balance from address
export type TBalanceLayout = {
  [address: string]: BalanceResponse;
}

// Wallet type currently storing address and wallet name
export type Wallet ={
    address: string;
    walletName: string;
  }
  
  // Wallet state type for redux
 export type WalletState = {
    wallets: Wallet[];
  }

  // Balance response type
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

  // Transaction full details
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

// Transaction mapping type
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
    walletName?:      string;
}