import { configureStore } from '@reduxjs/toolkit';
import { balanceSlice } from '../query/walletDetailsSlice'; 
import { walletApi } from "../query/getAllTransactions"
import walletsReducer from '../slice/walletsSlice';
import transactionReducer from '../slice/transactionSlice';
import totalTransactionsReducer from '../slice/totalTransactions';
import walletBalanceReducer from '../slice/walletBalanceSlice';
import sidebarReducer from '../slice/sidebarSlice';
export const store = configureStore({
  reducer: {
    [balanceSlice.reducerPath]: balanceSlice.reducer,
    [walletApi.reducerPath]: walletApi.reducer, 
    sidebar: sidebarReducer,
    wallets: walletsReducer,
    transactions: transactionReducer,
    totalTransactions: totalTransactionsReducer,
    walletBalances: walletBalanceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(balanceSlice.middleware), 
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;