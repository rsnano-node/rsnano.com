---
title: 'RsNano V1.0RC1 ready for testing'
date: 2024-10-04:00:00+01:00
draft: false
---

## RsNano V1.0RC1 ready for testing

After more than two years of development, the first release candidate of RsNano is finally ready for testing! Our code statistics currently show only 61% Rust and 39% C++ code, but this picture is deceptive. In reality, the node logic is 100% written in Rust and only the RPC server, the command line interface (CLI) and most of the tests are still written in C++. Thanks to Rui's work, the CLI and the RPC server will also be written in Rust in V2 and we will then have a 100% Rust node.

A lot of code has been changed over the last 2 years. It is very likely that despite continuous testing, there are still bugs in the program. Therefore:

**This version is not suitable for productive use. Please test it in the beta network if possible and please do not install this version on a principal representative!**

I've successfully bootstrapped the beta and the live ledger with this version. In theory you could also use an existing ledger file from nano_node, but this is not recommended.
Initial performance tests by gr0vity showed that RsNano can keep up with the official nano_node.

## Incompatibilities with nano_node

RsNano V1.0RC1 is equivalent to nano_node V27.1.

In RsNano there is currently no support for:
- Work generation with the distributed work server
- Work generation with OpenCL
- UPNP

These features will be readded in a future release.

## How to install?

The official docker image is: **simpago/rsnano:V1.0RC1**

You can run a beta node with:

    docker run -d --name rsnano -p 54000:54000 -v ~/NanoBeta:/root/NanoBeta simpago/rsnano:V1.0RC1 nano_node daemon --network=beta

You can run a live node with:

    docker run -d --name rsnano -p 7075:7075 -v ~/Nano:/root/Nano simpago/rsnano:V1.0RC1 nano_node daemon --network=live

Or you can compile it yourself. See the [github readme](https://github.com/rsnano-node/rsnano-node) for instructions.

As a tester, please join our [Discord server](https://discord.gg/kBwvAyxEWE) and share your feedback there.


## Join Us

Join our [Discord server](https://discord.gg/kBwvAyxEWE) to get the latest news, or if you want to contribute to RsNano.
Want to get involved? [We love contributions](https://rsnano.com/#contribute)

