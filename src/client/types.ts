export interface CreateSwapInitInstructionParams {
  reference: string;
  feePayer: string;
  wallet: string;
  sourceMint: string;
  destinationWallet: string;
  destinationMint: string;
  fee: string;
}
