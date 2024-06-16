import { PublicKey } from '@solana/web3.js';
import { Program } from '@metaplex-foundation/mpl-core';
import bs58 from 'bs58';
import { Stamp } from './accounts';

export class PreSwapProgram extends Program {
  static readonly PUBKEY = new PublicKey('C22H1SCARxMdgx8XgbP4ZSfTEa7RPKzncREgE6f54yag');

  static findStampAccount(reference: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(Stamp.PREFIX), bs58.decode(reference)],
      PreSwapProgram.PUBKEY,
    );
  }
}
