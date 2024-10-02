import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TransactionsResponse, Txref } from '@/types/common';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.blockcypher.com/v1/btc/test3/', // Base URL 
  }),
  endpoints: (builder) => ({
    getWalletTransactions: builder.query<Txref[], string>({
      query: (address) => `addrs/${address}/full`,
      transformResponse: (response: TransactionsResponse) => {
        // Limiting only 10 transactions and sort them by date , Same logic as we are using mongoDB
        return response.txrefs.slice(0, 10).sort((a, b) => new Date(b.confirmed).getTime() - new Date(a.confirmed).getTime());
      },
    }),
  }),
});

// Exports the hook for the query
export const { useLazyGetWalletTransactionsQuery } = walletApi;
