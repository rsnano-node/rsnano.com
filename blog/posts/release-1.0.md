---
title: 'RsNano V1.0 Release Announcement'
date: 2025-06-13T11:00:00+01:00
draft: false
---

We’re thrilled to announce the release of **RsNano V1.0**, the first official release of the Rust port of the original Nano node! 🎉

## What is RsNano?
RsNano is a complete reimplementation of the Nano node, originally written in C++, now fully ported to **Rust**. Started on May 10, 2021, as a hobby project by Gustav Schauwecker, RsNano has grown into a robust, production-ready node after over **4 years, 7,000+ commits,** and **100,000 lines of code**. The entire codebase is now 100% Rust, bringing enhanced security, modularity, and testability to the Nano ecosystem.

## Why RsNano?
RsNano strengthens the Nano network by:  
- **Increasing network security**: Memory-safe code reduces vulnerabilities.
- **Decentralizing development**: Diversifying the tech stack for broader participation.
- **Learning and innovation**: A platform to explore Nano’s internals.
- **Having fun**: Built with passion for coding and the Nano ecosystem!

## Why Rust?
Rust offers performance comparable to C++ but with **compile-time guarantees** for memory safety and thread safety, eliminating entire classes of bugs like:

- Buffer overflows
- Dangling pointers
- Use-after-free errors
- Null pointer dereferences

Rust’s modern design also simplifies multi-threaded programming, reduces bugs (like the ~70% of Microsoft’s bugs tied to memory safety), and makes refactoring easier. By using Rust, RsNano attracts a new wave of developers, fostering **decentralized development** and fresh contributions to the Nano community.

## Journey to V1.0

What began as a fun side project evolved into a full-time endeavor. The porting process was [live-streamed on YouTube](https://youtube.com/@gschauwecker), offering transparency and community engagement. Post-porting efforts focused on:

- Enhancing **unit tests** for reliability
- Improving **code modularity** and readability for future maintainability

## What's inside V1.0?
RsNano V1.0 is **compatible with nano_node V28.1**, but it only supports LMDB as the dababase backend. The database file is compatible too, so it is possible, although not recommended, to reuse an existing database file from nano_node.

For running it with docker, just execute:

     docker run -p 7075:7075 -v ~/Nano:/root/Nano simpago/rsnano:V1.0 --network=live node run

More options for building or running the node can be found in the [README](https://github.com/rsnano-node/rsnano-node/tree/releases/v1)

As this is the first release, please **consider it as bleeding edge** and please be aware that it may still contain issues.


## Thank You, Nano Community!
A huge thank you to the Nano community for their unwavering support and generous donations over the years. Your encouragement made RsNano V1.0 possible!

Special thanks to 
- [Rui (Fiono11)]() for porting many different parts (for example the whole RPC-module!) and for the many insightful discussions about Nano's protocol
- [Luxbe](https://github.com/luxbe) for creating the [rsnano.com](https://rsnano.com) website
- [Bob (gr0vity-dev)](https://github.com/gr0vity-dev) for testing RsNano
- [ArTombado](https://github.com/ArTombado) for being the first supporter and for contributing fixes to the RPC module
- [stjet](https://github.com/stjet) from the banano community for contributing to the RPC module

## What’s Next?
RsNano V1.0 marks a major milestone, but the journey continues. We’re excited to keep improving the node, welcoming new contributors, and strengthening the Nano network.

Get involved, try RsNano V1.0, join the [RsNano Discord server](https://discord.gg/kBwvAyxEWE) and join us in building Nano's future! 🚀

Gustav
Lead Developer, RsNano

