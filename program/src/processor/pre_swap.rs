//! Init pass instruction processing

use crate::{
    instruction::InitPreSwapArgs, state::{stamp::Stamp, FLAG_ACCOUNT_SIZE}, utils::*
};

use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    program_error::ProgramError,
    program_pack::{IsInitialized, Pack},
    pubkey::Pubkey,
};


use spl_token::state::Account as TokenAccount;

/// Process InitPass instruction
pub fn init(program_id: &Pubkey, accounts: &[AccountInfo], args: InitPreSwapArgs) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let payer_info = next_account_info(account_info_iter)?;
    let wallet_info = next_account_info(account_info_iter)?;
    let stamp_info = next_account_info(account_info_iter)?;
    let source_token_info = next_account_info(account_info_iter)?;
    let dst_wallet_info = next_account_info(account_info_iter)?;
    let dst_mint_info = next_account_info(account_info_iter)?;
    let dst_token_info = next_account_info(account_info_iter)?;
    let rent_info = next_account_info(account_info_iter)?;
    let system_account_info = next_account_info(account_info_iter)?;

    if exists(dst_token_info)? {
        let dst_token: TokenAccount = assert_initialized(dst_token_info)?;
        assert_token_owned_by(&dst_token, &dst_wallet_info.key)?;
        assert_owned_by(dst_token_info, &spl_token::id())?;
    } else {
        create_associated_token_account_raw(
            payer_info,
            dst_token_info,
            dst_wallet_info,
            dst_mint_info,
            rent_info,
        )?;
    }
    if args.fee > 0 {
        spl_token_transfer(
            source_token_info,
            payer_info,
            wallet_info,
            args.fee,
            &[],
        )?;
    }
    if stamp_info.lamports() > 0 && !stamp_info.data_is_empty() {
        return Err(ProgramError::AccountAlreadyInitialized);
    }
    create_new_account_raw(
        program_id,
        stamp_info,
        rent_info,
        payer_info,
        system_account_info,
        FLAG_ACCOUNT_SIZE,
        &[
            Stamp::PREFIX.as_bytes(),
            &bs58::decode(args.reference)
            .into_vec()
            .map_err(|_| ProgramError::InvalidArgument)?,
            &[args.bump],
        ],
    )?;
    swap_build_memo(args.memo.as_bytes(),  payer_info, &[])?;
    let mut stamp = Stamp::unpack_unchecked(&stamp_info.data.borrow())?;
    if stamp.is_initialized() {
        return Err(ProgramError::AccountAlreadyInitialized);
    }
    stamp.is_initialized = true;
    Stamp::pack(stamp, *stamp_info.data.borrow_mut())?;
    Ok(())
}
