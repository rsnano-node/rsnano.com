---
title: 'This month in RsNano 05/2023'
date: 2023-05-23T06:30:13+02:00
draft: false
---

<script>
  import { StatusGraph } from '$lib/Status';
</script>

Welcome to the sixth issue of _This month in RsNano_! RsNano is a Rust port of the original nano-node. This is a monthly
summary of its progress and community. Want to get involved? [We love contributions](https://rsnano.com/#community).

## Time out

Maybe you wondered why there were no blog posts and no livestreams for so long. The reason was that in February I got a severe case of a herniated disc. I could neither sit nor stand for quite a while, and that made me lose my rhythm. But now I am fully back! And that means there will be regular blog posts and live streams again!

Even though you haven't heard from me in the last few months, it doesn't mean that there hasn't been any progress. Quite the opposite - It went forward very well! Let's have a look:

## Roughly 36% is ported

Normally we compare progress to the previous month, but since there have been no reports since January, let's look at what has happened since January.

We had:

- 642 commits
- 22,888 lines inserted
- 15,910 lines deleted

This changed the current line count (excluding comments and blank lines) to:

- C++: 87,189 lines
- Rust: 50,040 lines

The ported status increased by **3.9 percentage points** to 36.5%.

<StatusGraph highlight="2023-05"/>

## Fiono's internship

If you are a regular reader of this blog, then you are familiar with Fiono. He's been helping port Nano to Rust for months, and as part of his PhD, he's working on improving Nano's consensus algorithm.

Earlier this year, he proposed to come to Germany to do a doctoral internship at RsNano. I was excited!
Working with him in person for a whole month would be awesome. So Fiono visited me in April and we worked together every day. I learned a lot of new things about consensus algorithms and how much work it is to prove them.

During his internship Fiono ported among others `gap_cache` and `unchecked_map` to Rust and he did a lot of work on his research papers about Nano's consensus algorithm.

It was a great time and it went by way too fast. Thank you so much Fiono! I really enjoyed it.

## Official Docker images

A new official Docker image of the current development version of RsNano is released at least once a week. You can find all images here: https://hub.docker.com/repository/docker/simpago/rsnano-beta/general

You can start a RsNano server on the beta network with this command:

```
docker run -d --name rsnano -p 54000:54000 -v ~/NanoBeta:/root/NanoBeta simpago/rsnano-beta:latest nano_node daemon --network=beta
```

Please keep in mind that RsNano is still alpha software and it wasn't as thoroughly tested as the official nano_node. It also is a bit slower than the official node, because of the glue layer between C++ and Rust. If you run into any problems with the docker image, please let me know on our [Discord server](https://discord.gg/kBwvAyxEWE).

## Beta Server

We now have an RsNano server running in the beta network: https://beta.rsnano.com/
It did a couple of full bootstraps and it worked really well. On the same server the official Nano node bootstrapped with 3 million blocks/hour and the RsNano version did it with **2.75 million blocks/hour**.
That slight drop in performance is due to the glue layer between C++ and Rust and won't be there once everything is ported to Rust. The core team has done an incredible job with improving bootstrapping. It's now possible to bootstrap a beta node in less than two days!

## Rewrite of the block cementation module

If a block has received enough votes, then it gets “cemented” in the ledger. That means the block is confirmed and cannot be rolled back anymore.

In the C++ node the class `confirmation_height_processor` is responsable for cementing a block. That class and its dependecies have grown overly complex over the years. It uses two entirely different implementations of the cementation algorithm (`confirmation_height_unbounded` and `confirmation_height_unbounded`) and that makes it even harder to understand.

I spent a lot of time cleaning it up and finally decided that a rewrite would be faster. So I rewrote the cementation code from scratch. The new implementation merges the two algorithms into one and simplified the code a lot. The new implementation is also thoroughly tested with unit tests and I added a few optimizations that are not part of the original code. I also did a stress test and it reached a sustained **18 million blocks/hour** on my not so fast laptop. Keep in mind that this number only relates to cementation and not to bootstrapping or network saturation.

## Upcoming live streams

I resume the weekly live streams. The live streams will be **every Tuesday from 19:30 UTC to 22:00 UTC**. So the next stream will be on Mai 30 and every Tuesday after that.

In the upcoming stream we will port a part of nano_node to Rust and there will be a 5 Nano giveaway!

You can watch the live streams on YouTube: https://www.youtube.com/@gschauwecker
or on Twitch: https://www.twitch.tv/gschauwecker

## Join us

Join our [Discord server](https://discord.gg/kBwvAyxEWE) to get the latest news, or if you want to contribute to RsNano.
