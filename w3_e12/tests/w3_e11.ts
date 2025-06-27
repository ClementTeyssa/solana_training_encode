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
});
