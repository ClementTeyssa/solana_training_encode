use anchor_lang::prelude::*;

declare_id!("CvwBSX5ZAtqExZFg8uhpsoKnogYPUSQRtzKD63FiqS7r");

#[program]
pub mod w3_e11 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let my_account: &mut Account<'_, MyAccount> = &mut ctx.accounts.my_account;
        my_account.balance = 100;
        msg!("Greetings from: {:?}", ctx.program_id);
        msg!("Balance initialized to: {}", my_account.balance);
        Ok(())
    }

    pub fn update_balance(ctx: Context<UpdateBalance>) -> Result<()> {
        let my_account_balance: &mut u64 = &mut ctx.accounts.my_account.balance;
        match my_account_balance {
            0..=900 => {
                my_account_balance += 100;
                msg!("Account balance received 100");
            }
            901..=999 => {
                my_account_balance = 1000;
                msg!("Account balance is now at the maximum : 1000")
            }
            1001..=u64::MAX => return err!(MyError::BalanceTooHigh),
        }
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

#[error_code]
pub enum MyError {
    #[msg("MyAccount could not update the balance higher than 1000")]
    BalanceTooHigh,
}
