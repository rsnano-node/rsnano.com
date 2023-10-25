---
title: 'This month in RsNano 11/2022'
date: 2022-11-28T07:35:30+01:00
draft: false
---

Welcome to the third issue of _This month in RsNano_! RsNano is a Rust port of the original nano-node. This is a monthly
summary of its progress and community. Want to get involved? [We love contributions](https://rsnano.com/#community).

## Roughly 30% is ported

This month we had:

- 128 commits
- 14,476 lines inserted
- 7281 lines deleted

This changed the current line count (excluding comments and blank lines) to:

- C++: 96,818 lines
- Rust: 42,274 lines

The ported status increased by **5.2 percentage points** to 30.4%. That was the most productive month we've ever had, percentage-wise. The big increase came from porting a lot of unit tests.

## Ledger fully ported

This month we reached another important milestone: the ledger and all its dependencies are ported. What exactly is the ledger, you might think? Let's look at this diagram:

![Ledger Diagram]/blog/Ledger.svg

Last month we had ported the LMDB data stores. Their task is to read and write raw data, like blocks, accounts, pending info, etc. However, the stores don't check the data to see if it is coherent. The ledger is one abstraction level higher. Its task is to ensure the consistency of the data, without knowning the details of how it is stored. The ledger includes a lot of complex logic, such as rolling back blocks.

Now that the ledger is ported, we can write tools in Rust that modify the ledger and we can be sure that the data is coherent.

## Ledger unit tests mostly ported

There are many unit tests for the ledger. Most of them are now ported. Since these unit tests were mostly very complex and difficult to read, I took the time to split them up and simplify them.

Currently, 380 unit tests run in Rust in 2.2 seconds. This is too slow for my taste, but I have plans that will lead to a massive speedup.

## Tutorial video for first contributors

I thought it would be helpful to create a YouTube video to help new contributors get started. I have created these
videos quick and dirty, but I think they are still helpful.They include the cloning and building of the project. Unfortunately the part where I port a small class is still missing, but I'm going to deliver this part in December.

## Community Contributions

[Fiono](https://github.com/Fiono11) has contributed 3 pull requests this month! He successfully ported the classes `prioritization`,
`inactive_cache_information` and `recently_cemented_cache`. That's impressive, since he only recently learned Rust.
Thanks a lot Fiono!

## Next Steps

The next steps are to port the remaining ledger unit tests and to upload a few more videos showing how to port a class. After that, I want to spend the rest of December working on simplifying the ledger code. Especially the checking of new blocks and the rolling back of blocks should be cleaned up.

## Join Us

Join our [Discord server](https://discord.gg/kBwvAyxEWE) to get the latest news, or if you want to contribute to RsNano.
