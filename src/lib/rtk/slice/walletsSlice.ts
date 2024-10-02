import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { btcImportWallet } from '../../actions'; 
import { EStatus } from '@/types/enum';
import { WalletState } from '@/types/common';

const initialState: WalletState = {
  wallets: [],
};

const walletSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    addWallet(state, action: PayloadAction<{ mnemonic: string; walletName: string }>) {
      const address = btcImportWallet(action.payload.mnemonic);
      if (address.status === EStatus.Error) {
        throw new Error('Error importing wallet');
      }
      state.wallets.push({ address: address.message, walletName: action.payload.walletName });
    },
  },
});

export const { addWallet } = walletSlice.actions;

export default walletSlice.reducer;
