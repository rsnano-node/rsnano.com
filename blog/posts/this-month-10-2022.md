---
title: 'This month in RsNano 10/2022'
date: 2022-10-27T07:49:01+02:00
draft: false
---

<script>
  import { StatusGraph } from '$lib/Status';
</script>

Welcome to the second issue of _This month in RsNano_! RsNano is a Rust port of the original nano-node. This is a monthly
summary of its progress and community. Want to get involved? [We love contributions](https://rsnano.com/#community).

## Roughly 25% is ported

This month we had:

- 160 commits
- 13,866 lines inserted
- 15,171 lines deleted

This changed the current line count (excluding comments and blank lines) to:

- C++: 100,185 lines
- Rust: 33,633 lines

The ported status increased by **1.5 percentage points** to 25%. This is less than in the previous months and is
due to the fact that most of this months work went into rewriting the LMDB data stores with the Rust crate `lmdb-rkv`,
which _decreased_ the Rust line count.

<StatusGraph highlight="2022-10"/>

## Database layer fully ported

We reached a milestone: All LMDB data stores are now fully ported to Rust! And it gets even better. The data stores were
still dependent on callbacks to C++ for using the LMDB C library. So after the last data
store was ported, all data stores were rewritten with the Rust crate [`lmdb-rkv`](https://crates.io/crates/lmdb-rkv).
This means that now the data stores are Rust only. It is now possible to write tools that work with the ledger in
pure Rust.

## First community contribution

This month we had our very first community contribution. [Fiono](https://github.com/Fiono11) was one of the first members in our Discord and we met in person at the London Meetup this year. He had said several times that he would like to help, but that he didn't know Rust yet. But now he has picked up Rust and translated his first class! He ported the class `rep_weights` in this [commit](https://github.com/simpago/rsnano-node/commit/977048478f700ee37723825e677e7916dc19fd80). Thanks a lot for your help Fiono!

Also many thanks to [Gr0vity](https://github.com/gr0vity-dev), who once again ran his test tools against
RsNano. It **reached up to 1100 CPS** on his very fast local setup. He said that RsNano worked just like the current develop branch of Nano, but was roughly 20% slower. That is
because the glue layer between Rust and C++ drains perfomance a bit. That's ok, because that glue layer will eventually
be removed. If you don't know Gr0vity's awesome test tools yet then check out [nano-local](https://github.com/gr0vity-dev/nano-local) on github.

## Removed C Libraries

All cryptography, hashing and random number generation is now handled in Rust. Therefore the following C/C++ libraries could be
removed from the repository:

- blake2: The hashing algorithm used by Nano
- Argon2: Another hashing algorithm used by Nano
- CryptoPP: A crypto library for C++
- LMDB: Lightning Memory-Mapped Database
- RocksDb: RocksDb will not be supported by RsNano

## Refactoring

Up until now the Rust code was similarly organised as the original Nano code. This has changed now. I took some time to
reorganize the Rust modules to better adhere to _screaming architecure_ . Eventually the RsNano crate will be split up into reusable sub crates, so that the community can develop new Nano related Rust projects.

## Next steps

- Port the `ledger` class, which is responsible for ensuring consistency of the ledger. It is a very big class and will
  take some time.
- Create a YouTube video for new contributors that shows how to port code in RsNano.
