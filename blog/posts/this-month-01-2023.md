---
title: 'This month in RsNano 01/2023'
date: 2023-01-26T07:35:53+01:00
draft: false
---

Welcome to the fifth issue of _This month in RsNano_! RsNano is a Rust port of the original nano-node. This is a monthly
summary of its progress and community. Want to get involved? [We love contributions](https://rsnano.com/#community).

## TLDR

- Not much happened because of vacation
- First development live stream was a success
- Next development live stream is scheduled
- Porting of class `confirmation_height_unbounded` is in progress

## Roughly 33% is ported

This month we had:

- 108 commits
- 3,313 lines inserted
- 1,589 lines deleted

This changed the current line count (excluding comments and blank lines) to:

- C++: 92,761 lines
- Rust: 44,866 lines

The ported status increased by **0.8 percentage points** to 32.6%. This increase is low again because I had taken time off over Christmas and New Year.

<div class="infogram-embed" data-id="f710250f-27e9-46eb-83c7-fc006b5266c6" data-type="interactive" data-title="RsNano
Progress 01/2023"></div><script>!function(e,i,n,s){var
t="InfogramEmbeds",d=e.getElementsByTagName("script")[0];if(window[t]&&window[t].initialized)window[t].process&&window[t].process();else
if(!e.getElementById(n)){var
	o=e.createElement("script");o.async=1,o.id=n,o.src="https://e.infogram.com/js/dist/embed-loader-min.js",d.parentNode.insertBefore(o,d)}}(document,0,"infogram-async");</script><div
	style="padding:8px
	0;font-family:Arial!important;font-size:13px!important;line-height:15px!important;text-align:center;border-top:1px
	solid #dadada;margin:0 30px"><a href="https://infogram.com/f710250f-27e9-46eb-83c7-fc006b5266c6"
	style="color:#989898!important;text-decoration:none!important;" target="_blank">RsNano Progress
	01/2023</a><br><a href="https://infogram.com" style="color:#989898!important;text-decoration:none!important;"
	target="_blank" rel="nofollow">Infogram</a></div>

## Vacation and Nano Blog

I took some days off in December to spend time with my family.

In January, the Nano Foundation kindly offered me to publish these monthly reports on the official Nano blog. Many thanks for that! It's great how the Nano Foundation supports community projects like RsNano.

To make this work smoothly, I now write these monthly reports a week in advance. Because of my vacation and because I am writing this report earlier than usual, it's slightly shorter than previous editions. However, there are still a couple of interesting things to update you on!

## First development live stream

To help new contributors get started, I tried something new: a development live stream on YouTube.

I had planned to port a small and simple part from Nano to Rust.
However, things escalated quickly, and suddenly I was entangled in solving a not-so-simple problem. It took the entire time of the stream to solve it! Nevertheless, I think the stream was really helpful for newcomers.

The whole thing was meant as an experiment. If there was enough interest, then I wanted to stream regularly. The stream consistently had between 8 and 16 live viewers and that was more than I expected. So I consider this a success and will now stream once a month! Thanks to all who participated.

You can watch the stream here on YouTube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/xrgGtdMYcKM" title="YouTube video player"
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;
web-share" allowfullscreen></iframe>

If you would like to get involved in RsNano, we always love contributions!

## Upcoming live stream: Tuesday, Feb 07, at 19:30 UTC

Since the last live stream was better received than expected, I will now stream every month. The next date is Tuesday, February 7 at 19:30 UTC (20:30 Berlin / 14:30 EST).

This time we will try again to port the class `backlog_population` to Rust.

You can watch the upcoming stream here: https://www.youtube.com/watch?v=xPn4HzGPt1s

## Porting of `confirmation_height_processor`

If a block has received enough votes, then it gets "cemented" in the ledger. That means the block cannot be
rolled back anymore.

The class `confirmation_height_processor` is responsible for cementing blocks. It uses a bounded and an unbounded
implementation of the cementing algorithm. As a first step to port the `confirmation_height_processor` I startet porting and simplifying the `confirmation_height_unbounded` class. This is still work in progress and will be shown in detail in next month's issue of "This month in RsNano".

## Join Us

Join our [Discord server](https://discord.gg/kBwvAyxEWE) to get the latest news, or if you want to contribute to RsNano.
