// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { walletApi } from '../query/getAllTransactions';
import walletsReducer from '../slice/walletsSlice';
import transactionReducer from '../slice/transactionSlice';
import totalTransactionsReducer from '../slice/totalTransactions';
import BalanceReducer from '../slice/walletBalanceSlice';
export const store = configureStore({
  reducer: {
    [walletApi.reducerPath]: walletApi.reducer,
    wallets: walletsReducer,
    transaction: transactionReducer, 
    totalTransactions: totalTransactionsReducer,
    balance: BalanceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(walletApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;