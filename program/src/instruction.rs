//! Instruction types
#![allow(missing_docs)]

use borsh::{BorshDeserialize, BorshSerialize};

/// Initialize a funding arguments
#[repr(C)]
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug, Clone)]
/// Initialize a funding params
pub struct InitPreSwapArgs {
    pub bump: u8,
    pub reference: String,
    pub memo: String,
    pub fee: u64,
}


#[repr(C)]
#[derive(BorshSerialize, BorshDeserialize, Debug, PartialEq, Clone,)]
pub enum PreSwapInstruction {
    Init(InitPreSwapArgs),
}
