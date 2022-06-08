import {
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmTransaction,
    Transaction,
    TransactionInstruction
} from "@solana/web3.js";

(async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const wallet = Keypair.generate();

    let airdropTransaction = await connection.requestAirdrop(
        wallet.publicKey,
        LAMPORTS_PER_SOL
    );

    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: airdropTransaction
    });

    // TODO: invoke memo program

    try {
        const instruction = new TransactionInstruction({
            keys: [],
            programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
            data: Buffer.from("test")
        })
        const transaction = new Transaction()
        transaction.add(instruction)

        const tx = await sendAndConfirmTransaction(
            connection,
            transaction,
            [wallet]
        )

        console.log(tx)
    } catch (e) {
        console.log(e)
    }
})();
