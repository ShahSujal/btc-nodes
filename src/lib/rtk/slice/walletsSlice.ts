import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { btcImportWallet } from '../../actions'; 
import { EStatus } from '@/types/enum';
import { WalletState } from '@/types/common';
import { updateWalletBalance } from './walletBalanceSlice';
import { balanceSlice } from '../query/walletDetailsSlice';
import { AppDispatch } from '../store/store';

const initialState: WalletState = {
  wallets: [],
};

const walletSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    addWallet(state, action: PayloadAction<{ mnemonic: string; walletName: string }>) {
      // revalidate the mnemonic
      const address = btcImportWallet(action.payload.mnemonic);
      if (address.status === EStatus.Error) {
        throw new Error('Error importing wallet');
      }
      state.wallets.push({ address: address.message, walletName: action.payload.walletName });
    },
    deleteWallet(state, action: PayloadAction<string>) {
      state.wallets = state.wallets.filter(wallet => wallet.address !== action.payload);
    },
  },
});

export const { addWallet, deleteWallet } = walletSlice.actions;

export const addWalletAndFetchBalance = (mnemonic: string, walletName: string) => async (dispatch: AppDispatch) => {
  try {
    // Dispatch the addWallet action
    dispatch(addWallet({ mnemonic, walletName }));

    // Fetch the wallet balance
    const address = btcImportWallet(mnemonic).message;
    const result = await dispatch(balanceSlice.endpoints.getWalletBalanace.initiate(address));

    if (result.data) {
      // Dispatch the updateWalletBalance action
      dispatch(updateWalletBalance({
        address,
        balance: result.data,
      }));
    }
  } catch (error) {
    console.error('Failed to add wallet and fetch balance:', error);
    throw new Error('Failed to add wallet and fetch balance');
  }
};

export default walletSlice.reducer;