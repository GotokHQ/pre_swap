use borsh::BorshDeserialize;
use crate::instruction::PreSwapInstruction;

use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, msg, pubkey::Pubkey};

pub mod pre_swap;

pub struct Processor;
impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = PreSwapInstruction::try_from_slice(instruction_data)?;
        msg!("Successfully deserialized init pre swap instruction");

        match instruction {
            PreSwapInstruction::Init(args) => {
                msg!("Instruction: Init Stamp");
                pre_swap::init(program_id, accounts, args)
            }
        }
    }
}
