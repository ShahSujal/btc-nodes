import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BalanceResponse } from '@/types/common';

export const balanceSlice = createApi({
  reducerPath: 'balanceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.blockcypher.com/v1/btc/test3/', 
  }),
  endpoints: (builder) => ({
    getWalletBalanace: builder.query<BalanceResponse, string>({
      query: (address) => `addrs/${address}/balance`,
    }),
  }),
});

// Exports the hook for the query
export const { useLazyGetWalletBalanaceQuery } = balanceSlice;
