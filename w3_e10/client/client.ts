import * as anchor from "@coral-xyz/anchor";
import * as web3 from "@solana/web3.js";
// Client
import { PublicKey } from "@solana/web3.js";
import type { HelloAnchor } from "../target/types/hello_anchor";

// Configure the client to use the local cluster
anchor.setProvider(anchor.AnchorProvider.env());

const program = anchor.workspace.HelloAnchor as anchor.Program<HelloAnchor>;


// Devnet address
const phantomAdress = "6q86fXa4QxvvxtgmypqD7sQgGgSJUT7jRqCLGJBC2cXm";
let myPublicKey = new PublicKey(phantomAdress);

myPublicKey = program.provider.publicKey;


console.log("My address:", program.provider.publicKey.toString());
const balance = await program.provider.connection.getBalance(program.provider.publicKey);
console.log(`My balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);

//Ask Airdrop -> You've either reached your airdrop limit today or the airdrop faucet has run dry. Please visit https://faucet.solana.com for alternate sources of test SOL
let airdropSignature = await program.provider.connection.requestAirdrop(program.provider.publicKey, web3.LAMPORTS_PER_SOL);
await program.provider.connection.confirmTransaction({ signature: airdropSignature });