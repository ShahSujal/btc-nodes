import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootLayout, Txref } from '@/types/common';

const initialState: TRootLayout = {};

const transaction = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    updateWalletTransactions: (state, action: PayloadAction<{ address: string; transactions: Txref[]; walletName: string }>) => {
      // Destructure the payload
      const { address, transactions, walletName } = action.payload;

      // Initialize the state for the address if it doesn't exist
      if (!state[address]) {
        state[address] = [];
      }
      
      // adding walletName 
      state[address] = transactions.map(transaction => ({
        ...transaction,
        walletName,
      }));
    },
  },
});

export const { updateWalletTransactions } = transaction.actions;
export default transaction.reducer;