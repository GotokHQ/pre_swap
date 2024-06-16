import { PublicKey } from '@solana/web3.js';
import { Program } from '@metaplex-foundation/mpl-core';
import bs58 from 'bs58';
import { Stamp } from './accounts';

export class PreSwapProgram extends Program {
  static readonly PUBKEY = new PublicKey('3p2ciATj9kchGotTBzMubgK5E46CUfrhSF8MLzxjHxwE');

  static findStampAccount(reference: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(Stamp.PREFIX), bs58.decode(reference)],
      PreSwapProgram.PUBKEY,
    );
  }
}
