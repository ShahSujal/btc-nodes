import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  totalTransactions: 0,
};

const totalTransactionsSlice = createSlice({
  name: 'totalTransactions',
  initialState,
  reducers: {
    updateTotalTransactions: (state, action: PayloadAction<{transactions: number }>) => {
      const { transactions } = action.payload;
      state.totalTransactions = transactions;
    },
    resetTotalTransactions: (state) => {
      state.totalTransactions = 0;
    },
  },
});

export const { updateTotalTransactions, resetTotalTransactions } = totalTransactionsSlice.actions;
export default totalTransactionsSlice.reducer;