---
title: 'This month in RsNano 12/2022'
date: 2024-05-27T12:00:00+01:00
draft: false
---

## A working Nano node written in 100% Rust

Yes, you read that right. Last Friday I ran a 100% Rust nano node for the first time. It took more than 2000 hours of work to reach that goal and it was lots of fun! I've been incrementally porting the codebase from C++ to Rust for over 2 years. Then the moment came where the last bits of the nano node code were moved over to Rust and I was done. It was very exciting to reach that goal and to run the Rust node for the very first time. This is how it looked:
![Video of RsNano node](/blog/rsnano-node-starting.webm)

This is a huge milestone, but don't get too excited yet. There are still some limitations, that need to be worked on. Firstly, the main function that runs the node is just a quick and dirty prototype. It doesn't parse command line arguments and doesn't read config files. Also there is no RPC or IPC server support and no work generation with OpenCL or with an external work server (but CPU work generation is possible). 

So what's next? Of course all of those missing features have to be implemented in Rust. Also the RsNano code repository is currently 200 commits behind the C++ repository. This will be the focus for the next weeks. Then, shortly after V27 is released, I'm going to release RsNano 1.0-alpha for public testing, which will be equivalent to V27.

## Let's celebrate on Tuesday's live stream

Let's celebrate this milestone on Tuesday May 27 on YouTube and on Twitch. I'm going to stream as usual from 19:00 UTC to 21:00 UTC and as usual there will be **Ӿ10 giveaway**. 
 [YouTube channel](https://www.youtube.com/@gschauwecker). 
 [Twitch channel](https://www.twitch.tv/gschauwecker)


## Join Us

Join our [Discord server](https://discord.gg/kBwvAyxEWE) to get the latest news, or if you want to contribute to RsNano.
Want to get involved? [We love contributions](https://rsnano.com/#community)

