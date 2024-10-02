import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootLayout, Txref } from '@/types/common';

const initialState: TRootLayout = {};

const transaction = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    updateWalletTransactions: (state, action: PayloadAction<{ address: string; transactions: Txref[] }>) => {
      // So the approach here is we are updating each address transactions in the state  
      const { address, transactions } = action.payload;

      // Initialize the state for the address if it doesn't exist example state = { 'tb1q.....ugphl': [] }
      if (!state[address]) {
        state[address] = [];
      }

      // Updating transactions for the address
      state[address] = transactions;
    },
  },
});

export const { updateWalletTransactions } = transaction.actions;
export default transaction.reducer;
