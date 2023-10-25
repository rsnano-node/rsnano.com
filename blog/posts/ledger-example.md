---
title: 'How to open the Nano ledger with Rust'
date: 2022-12-12T10:41:51+01:00
draft: false
---

Over the last few weeks I've been working on splitting RsNano into reusable libraries.The result currently looks like this:

![RsNano Crates](/blog/rsnano_crates.svg)

This breakdown is still too simplistic and will be extended in the course of time. However, the extracted crates already allow working with the nano ledger!

To work with the ledger these crates can be used:

- `rsnano_core`: Contains the basic types like `BlockHash`, `Account`, `KeyPair`,...
- `rsnano_store_traits`: Contains traits for the data stores.
- `rsnano_store_lmdb`: Contains the LMDB data store implementation
- `rsnano_ledger`: Contains the ledger implementation. It is responsible for the consinstency of the data stores,
  without knowing the specifics of how the data is stored.

I wrote a little Rust tool that shows how to use these crates. You can find the source code here: https://github.com/simpago/rsnano-ledger-example

Let's have a look at `Cargo.toml`:

```toml
[package]
name = "rsnano-ledger-example"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
anyhow = "1.0.66"
rsnano_core = {git = "https://github.com/simpago/rsnano-node", branch="develop"}
rsnano_store_traits = {git = "https://github.com/simpago/rsnano-node", branch="develop"}
rsnano_store_lmdb = {git = "https://github.com/simpago/rsnano-node", branch="develop"}
rsnano_ledger = {git = "https://github.com/simpago/rsnano-node", branch="develop"}
```

The dependencies point directly to the RsNano git repository. This is currently necessary since there is no official release on crates.io yet. The APIs of the crates are still changing a lot, so a release doesn't make sense yet.

Now let's look at the `main.rs` file:

```Rust
use rsnano_ledger::{Ledger, LedgerConstants};
use rsnano_store_lmdb::LmdbStore;
use std::{path::PathBuf, sync::Arc};

fn main() -> anyhow::Result<()> {
    // Open the ledger
    let home = std::env::var("HOME")?;
    let mut ledger_path = PathBuf::new();
    ledger_path.push(home);
    ledger_path.push("NanoBeta/data.ldb");

    println!("Opening ledger {:?}", ledger_path);
    let store = Arc::new(LmdbStore::open(&ledger_path)?);
    let ledger = Ledger::new(store, LedgerConstants::beta()?)?;

    // Start a database transaction
    let txn = ledger.read_txn();

    // Print number of accounts
    let accounts = ledger.store.account().count(txn.txn());
    println!("{} accounts in the ledger", accounts);

    // Print number of unchecked blocks
    let unchecked = ledger.store.unchecked().count(txn.txn());
    println!("{} unchecked blocks", unchecked);

    // Print a random block hash
    let random_block = ledger.store.block().random(txn.txn()).unwrap();
    println!("a random block: {}", random_block.as_block().hash());

    // Print all blocks that are checked but unconfirmed
    let mut iter = ledger.store.block().begin(txn.txn());
    while let Some((hash, block)) = iter.current() {
        let account = ledger.account(txn.txn(), hash).unwrap();

        let confirmation = ledger
            .store
            .confirmation_height()
            .get(txn.txn(), &account)
            .unwrap_or_default();

        if block.sideband.height > confirmation.height {
            print!("found unconfirmed block: {}", hash);
        }

        iter.next();
    }

    Ok(())
}
```

As you can see, it is not difficult to open the ledger and work with it. The sample program opens the ledger, prints the
number of accounts and unchecked blocks. Then it prints a random block hash and then all unconfirmed blocks.

In this way you can now write tools that work with the ledger.

If you have any questions about using the crates, please [join our Discord](https://discord.gg/kBwvAyxEWE)
