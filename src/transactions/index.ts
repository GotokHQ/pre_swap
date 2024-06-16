import { Borsh } from '@metaplex-foundation/mpl-core';
import BN from 'bn.js';

type Args = {
  bump: number;
  reference: string;
  fee: BN;
};

export class InitPreSwapArgs extends Borsh.Data<Args> {
  static readonly SCHEMA = InitPreSwapArgs.struct([
    ['instruction', 'u8'],
    ['bump', 'u8'],
    ['reference', 'string'],
    ['memo', 'string'],
    ['fee', 'u64'],
  ]);

  instruction = 0;
  bump: number;
  reference: string;
  memo: string;
  fee: BN;
}
