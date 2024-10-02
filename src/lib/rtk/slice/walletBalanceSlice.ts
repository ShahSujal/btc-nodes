import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BalanceResponse, TBalanceLayout } from '@/types/common';

const initialState: TBalanceLayout = {};

const balance = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    updateWalletBalance: (state, action: PayloadAction<{ address: string; balance: BalanceResponse }>) => {
      const { address, balance } = action.payload;

      // Initialize the state for the address if it doesn't exist
      if (!state[address]) {
        state[address] = {
          address: '',
          total_received: 0,
          total_sent: 0,
          balance: 0,
          unconfirmed_balance: 0,
          final_balance: 0,
          n_tx: 0,
          unconfirmed_n_tx: 0,
          final_n_tx: 0,
        };
      }

      // Updating balance for the address
      state[address] = balance;
    },
  },
});

export const { updateWalletBalance } = balance.actions;
export default balance.reducer;