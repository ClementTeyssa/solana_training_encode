use anchor_lang::prelude::*;

declare_id!("CvwBSX5ZAtqExZFg8uhpsoKnogYPUSQRtzKD63FiqS7r");

#[program]
pub mod w3_e11 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.balance = 100;
        msg!("Greetings from: {:?}", ctx.program_id);
        msg!("Balance initialized to: {}", my_account.balance);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MyAccount {
    pub balance: u64,
}
