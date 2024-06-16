pub mod error;
pub mod instruction;
pub mod processor;
pub mod state;
pub mod utils;

#[cfg(not(feature = "no-entrypoint"))]
pub mod entrypoint;

use solana_program::declare_id;


declare_id!("C22H1SCARxMdgx8XgbP4ZSfTEa7RPKzncREgE6f54yag");
