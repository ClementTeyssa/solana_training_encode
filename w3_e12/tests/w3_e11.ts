import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { W3E11 } from "../target/types/w3_e11";
import { expect } from "chai";

describe("w3_e11", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.W3E11 as Program<W3E11>;

  it("Initializes with balance of 100", async () => {
    const myAccount = anchor.web3.Keypair.generate();

    await program.methods
      .initialize()
      .accounts({
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([myAccount])
      .rpc();

    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    expect(account.balance.toNumber()).to.equal(100);
  });

  it("Update balance from 100 to 200 (0-900 range)", async () => {
    const myAccount = anchor.web3.Keypair.generate();
    
await program.methods.initialize().accounts({
myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,

    }).signers([myAccount]).rpc();

    await program.methods.updateBalance().accounts({
myAccount: myAccount.publicKey,
    }).rpc();

    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    expect(account.balance.toNumber()).to.equal(200);
  });

it("Update balance from 900 to 1000", async () => {
    const myAccount = anchor.web3.Keypair.generate();
    
await program.methods.initialize().accounts({
myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,

    }).signers([myAccount]).rpc();

   for (let i = 0; i < 8; i++) {
await program.methods.updateBalance().accounts({
myAccount: myAccount.publicKey,
    }).rpc();
    } 

    let account = await program.account.myAccount.fetch(myAccount.publicKey);
    expect(account.balance.toNumber()).to.equal(900);
    await program.methods.updateBalance().accounts({
myAccount: myAccount.publicKey,
    }).rpc();
account = await program.account.myAccount.fetch(myAccount.publicKey);
    expect(account.balance.toNumber()).to.equal(1000);
  });


  it("Throws BalanceTooHigh error when balance is already 1000", async () => {
    const myAccount = anchor.web3.Keypair.generate();
    
await program.methods.initialize().accounts({
myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,

    }).signers([myAccount]).rpc();

  for (let i = 0; i < 9; i++) {
await program.methods.updateBalance().accounts({
myAccount: myAccount.publicKey,
    }).rpc();
    } 

    let account = await program.account.myAccount.fetch(myAccount.publicKey);
    expect(account.balance.toNumber()).to.equal(1000);

    try {
     await program.methods.updateBalance().accounts({
myAccount: myAccount.publicKey,
    }).rpc();
expect.fail("Expected BalanceTooHigh error");
    } catch (error) {
      expect(error.error.errorCode.code).to.equal("BalanceTooHigh");
      expect(error.error.errorMessage).to.include("MyAccount could not update the balance higher than 1000");
    }
  });
});
