import {
  PublicKey,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
} from '@solana/web3.js';
import * as spl from '@solana/spl-token';
import { CreateSwapInitInstructionParams } from './types';
import { PreSwapProgram } from '../pre_swap_program';
import { InitPreSwapArgs } from '../transactions';
import { BN } from 'bn.js';

export const MEMO_PROGRAM_ID = new PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo');

export const createPreSwapInstruction = (input: CreateSwapInitInstructionParams) => {
  const feePayer = new PublicKey(input.feePayer);
  const wallet = new PublicKey(input.wallet);
  const [stamp, bump] = PreSwapProgram.findStampAccount(input.reference);
  const sourceMint = new PublicKey(input.sourceMint);
  const sourceToken = spl.getAssociatedTokenAddressSync(sourceMint, wallet, true);
  const payerToken = spl.getAssociatedTokenAddressSync(sourceMint, wallet, true);
  const destinationMint = new PublicKey(input.destinationMint);
  const destinationWallet = new PublicKey(input.destinationWallet);
  const destinationToken = spl.getAssociatedTokenAddressSync(
    destinationMint,
    destinationWallet,
    true,
  );
  const fee = new BN(input.fee);
  const data = InitPreSwapArgs.serialize({
    bump,
    reference: input.reference,
    memo: input.memo,
    fee: fee,
  });
  const keys = [
    {
      pubkey: feePayer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: wallet,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: stamp,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: payerToken,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: sourceMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: sourceToken,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: destinationWallet,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: destinationMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: destinationToken,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: spl.TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: MEMO_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ];
  return new TransactionInstruction({
    keys,
    data,
    programId: PreSwapProgram.PUBKEY,
  });
};
