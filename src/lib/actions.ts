// thanks for providing reference of https://iancoleman.io/bip39/#english helps a lot in testing
import * as bip39 from "bip39";
// directly we can't use bip39 . required secp256k1
import * as ecc from "tiny-secp256k1";
import { BIP32Factory } from "bip32";
import { payments, networks } from "bitcoinjs-lib";
import { EStatus } from "@/types/enum";
import { TResponseType } from "@/types/common";
import { Buffer } from "buffer";
// Vite does'nt have buffer support as global variable
window.Buffer = Buffer;
// Create BIP32 factory
const bip32 = BIP32Factory(ecc);

export const btcImportWallet = (mnemonic: string): TResponseType => {
  try {
  // Triming so no extra spaces are present and validating the mnemonic
  const trimmedMnemonic = mnemonic.trim();
  if (!bip39.validateMnemonic(trimmedMnemonic)) {
    return {
      status: EStatus.Error,
      message: 'Invalid mnemonic provided',
    };
  }
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed);
  const account = root.derivePath(`m/44'/1'/0'/0/0`); // m/44'/1' testnet & '0' mainnet
  // Generating the P2PKH address from the account public key
  const { address } = payments.p2pkh({
    pubkey: account.publicKey,
    network: networks.bitcoin,
  });
  if (!address) {
    return {
      status: EStatus.Error,
      message: 'Error in extracting address',
    };
  }
  return {
    status: EStatus.Success,
    message: address,
  };

} catch (error) {
  console.error('Error during wallet import:', error);
  return {
    status: EStatus.Error,
    message: 'Error when importing wallet',
  };
}
};