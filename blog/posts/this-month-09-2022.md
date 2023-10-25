---
title: 'This month in RsNano 09/2022'
date: 2022-09-29T07:31:18+02:00
draft: false
---

Welcome to the first issue of _This month in RsNano_! RsNano is a Rust port of the original nano-node. This is a monthly
summary of its progress and community. Want to get involved? [We love contributions](https://rsnano.com/#community).

To keep the community up to date about the current development of RsNano, there will be a "This Month in RsNano" post every month from now on.

## Roughly 23% is ported

I have been working on RsNano almost every day for 6 months now. It has been great fun and the porting has made good
progress. Roughly 23% are translated now:

<div class="infogram-embed" data-id="457895d6-bfe5-4091-8233-9af5862080a8" data-type="interactive" data-title="Copy: RsNano Translation Progress"></div><script>!function(e,i,n,s){var t="InfogramEmbeds",d=e.getElementsByTagName("script")[0];if(window[t]&&window[t].initialized)window[t].process&&window[t].process();else if(!e.getElementById(n)){var o=e.createElement("script");o.async=1,o.id=n,o.src="https://e.infogram.com/js/dist/embed-loader-min.js",d.parentNode.insertBefore(o,d)}}(document,0,"infogram-async");</script><div style="padding:8px 0;font-family:Arial!important;font-size:13px!important;line-height:15px!important;text-align:center;border-top:1px solid #dadada;margin:0 30px"><a href="https://infogram.com/457895d6-bfe5-4091-8233-9af5862080a8" style="color:#989898!important;text-decoration:none!important;" target="_blank">Copy: RsNano Translation Progress</a><br><a href="https://infogram.com" style="color:#989898!important;text-decoration:none!important;" target="_blank" rel="nofollow">Infogram</a></div>

Some notable parts now running in Rust are:

- Serialization / deserialization of all network messages
- Serialization / deserialization of all block types
- Blake2b block hashes
- Signatures
- Key / Seed encryption
- Socket communication
- Stats
- Local vote history
- Vote spacing
- Bootstrap client
- _Almost all LMDB database code!_

Because the porting is done in small increments, the node is fully functional, although many parts are not yet translated.

## Database layer almost fully ported to Rust

For the last weeks the focus was on porting the LMDB database parts. All data stores except `wallet_store` are now
written in Rust. `wallet_store` will be ported soon and then all database code will be in Rust! The next
step will then be to switch to the Rust crate `lmdb-rkv` and to delete the C++ lmdb submodule.

The RocksDB implementation was removed, because RocksDB is currently not in the focus of NF and I wanted to reduce the
scope of this project.

## Collaboration with Nano Foundation

In August I attended the Nano London meetup. It was a fantastic event and it was a great pleasure to meet the core team
and many awesome people of the nano community! The core team was very welcoming and interested in Rust and RsNano. We
decided to work closely together and help each other. The collaboration with NF has been a joy and is very helpful and
insightful.

Many thanks to [Gr0vity](https://github.com/gr0vity-dev) for thoroughly testing RsNano node and for providing the test
results!

## Next Steps

Finish porting the LMDB layer and switch to the Rust crate `lmdb-rkv`.
