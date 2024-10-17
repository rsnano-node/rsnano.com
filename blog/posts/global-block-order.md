---
title: 'Global Block Order in Nanos Ledger'
date: 2024-11-17T00:00+01:00
draft: false
---

# Global Block Order in Nano's Ledger

Recent discussions on Nano's Discord server lead me down a rabbit hole that I want to share with this blog post. Dylan, Fiono and some others were discussing about how to speed up Nano's slow bootstrapping. Their ideas were very interesting, but still seemed problematic to me. So I thought about ways to make bootstrapping faster too. The following proposal is heavily influenced by Colin's block table split, Dylan's [proposal](https://hackmd.io/@dylan1951/SkZXnRKwA) and Rui's various ideas of how to introduce a global block order.

## What is the problem?
Nano's bootstrapping process is too slow! It currently takes many days or even weeks to bootstrap a new node and it will only get slower. Why is it so slow? When you set up a new Nano node it has to 

1. download all blocks that were ever confirmed (the "ledger")
1. confirm all of those blocks by requesting votes from the representatives

### Downloading the blocks
Generally I don't see a big issue in having to downloading all of the blocks. Blocks are light weight. The Nano network has been running for 9 years and the raw block data is around 50GB. That's not a lot really. For light nodes there certainly are strategies out there that don't require a full download. For full nodes unfortunately the download itself is inefficient. This is due to the fact that Nano's asynchronous block processing causes the nodes to have different orderings of the blocks and this is why a bootstrapping node has to request and confirm blocks individually.

### Confirming the blocks
This step I find very troublesome. The Nano ledger currently as more than 30 million accounts and more than 200 million blocks. That means a single bootstrapping node will **request votes for at least 30 million individual blocks (the "frontiers")  and probably a lot more!** This is not efficient at all. So how can we bootstrap without needing many millions of votes?

## Achieving a global block order
Colin, Rui, Dylan and others have discussed this before: If there was a global block order across all nodes, we could make bootstrapping much more efficient. We could just receive all blocks in one efficient ordered data stream and then we would only have to **vote once for the last bock** and that would confirm the whole ledger! Now this sounds like a brilliant solution. But how can we introduce global ordering? Let's have a look at a simple block lattice example:
![Examplary block lattice structure](https://rsnano.com/blog/global-block-order/ledger-1.png)
### Local confirmation order 

Nano's asynchronous nature does not define an order for those blocks. But a node does confirm blocks **sequentially**. So the first thing we could do, is to store the confirmation order of those blocks. Colin calls this the "block table split":

![Storing processing order](http://rsnano.com/blog/global-block-order/ledger-2.png)
As you can see in the above diagram, the ledger now has a **ledger height** which defines the **local confirmation order**. But different nodes may have a different confirmation order. In our example "Node 1" has block G3 on height 3 where "Node 2" has block B1 on that height.

### Reordering confirmed blocks

Can we make all nodes have the same order instead? Yes! By not storing the confirmation order, but by **reordering the blocks by defined rules**. Let's reorder the blocks by this rule: 

> For each ledger height, take all possible candidates where the dependencies are fulfilled (previous block and link confirmed) and pick the block with the lowest block hash.

This changes our ledger like this: (For simplicity the hashes are shortened to just 3 places)

![Ordering blocks by lowest hash](https://rsnano.com/blog/global-block-order/ledger-3.png)
So in our example we have two candidates for ledger height 3: blocks B1 and G3. We pick B1 because its hash (#aaa) is lower than G3's hash (#bbb).
If all nodes do this reordering, they should all end up with the same block order!
But in practice, this is still doesn't work, because we have a constant inflow of new blocks and that **would cause our ledger to be constantly reordered**. As long as new blocks are added, nodes can't agree on a global order.

## Making the Ledger partially immutable with epochs
We can stop the constant reordering of the ledger by simply not accepting new blocks. Ok, it's not so simple - we can't stall the network. So let's divide the ledger into "epochs" of a certain size. For simplicity let's start with a fixed epoch size of 10 million blocks. When the current epoch reaches 10 million blocks we **end the current epoch**. This means we stop accepting new blocks for that epoch and start a new epoch instead. Then we can reorder the blocks of the ended epoch and **all nodes should end up with the same block order in that epoch!**

![Introducing epochs](https://rsnano.com/blog/global-block-order/ledger-4.png)
Nodes can then generate a single hash for the whole epoch and vote on it, so that all nodes can be sure to have the same epochs.
With this system, Nano can keep it's asynchronous nature in the current epoch, while we retrofit a synchronous block processing for the past epochs. We get the best of both worlds.

## Super fast bootstrapping
Let's do some napkin math. The raw block data is currently around 50GB. A bootstrapping node could just download the confirmed epochs as a simple data stream. With a 1GBit/s connection a node should be able to download the epochs in only 10 minutes.

After downloading the epoch, the node would calculate the epoch hash and confirm it with Nano consensus. If the epoch is confirmed, all blocks can be inserted into the ledger as confirmed without additional votes. I guess this could be done in just a couple of hours. So **bootstrapping a live nano node would be done in just a couple of hours!**

## Implementation details
### Voting on epoch size
Nano follows the excellent principle of **"no magic numbers"**. Magic numbers like *block size* or *block time* are too rigid and probably sub optimal. An epoch size of 10 million would be such a magic number. We can make the epoch size dynamic by letting nodes vote on it.

We could introduce a new message that lets nodes vote on the current epoch:

```
struct VoteCurrentEpoch {
    voting_account: Account,
    timestamp: u64,
    epoch: u32,
    signature: Signature
}
```

Nodes would periodically vote on the current epoch. Every node operator can set their preferred epoch size in the node configuration file. Once 66% of the online vote weight votes for a new epoch, the new epoch begins.
### Adding the epoch to ConfirmAck
All nodes have to agree which blocks belong into which epoch. So we have to extend the ConfirmAck message to include the epoch number for each block hash. When the current epoch is closed there can be a short time where nodes don't agree on which epoch to use. A simple implementation would just keep voting until all nodes agree on the epoch. A more advanced implementation could confirm the block if 66% of online vote weight confirms the block but not the epoch and then vote again on which epoch to use.
### Confirming an epoch
When an epoch ends, nodes have to vote on the epoch hash. The epoch hash would be a hash of all ordered block hashes. The message could look like this:

```
struct VoteEpochConfirm {
    voting_account: Account,  
    timestamp: u64,  
    epoch: u32,
    epoch_hash: BlockHash,
    previous_epoch_hash: BlockHash,
    signature: Signature
}
```
Because it is globally agreed on, which block are in the epoch, all nodes would eventually get the same epoch hash. If a node misses a block, it would eventually receive it via the existing bootstrap strategies and can then eventually confirm the epoch.

### Starting the epoch system with a canary block
This new system can be started by releasing a canary block, once enough nodes have updated. If an old node still  sends ConfirmAck messages without an epoch number, we can interpret this as voting for epoch 0.

### Ascending bootstrap improvements
With ledger epochs we can significantly optimize ascending bootstrap. Currently the node has to periodically iterate through all accounts and ask its peers for new blocks. If we pass our last confirmed epoch, the peered node can just skip all accounts that haven't changed since that epoch. This will probably reduce the amount of accounts to query by far more than 90%!

## Closing
Please let me know what you think of this proposal. Maybe it inspires you to come up with something better! Let's discuss this on Nano's Discord server in the Protocol channel.

## Join Us

Join our [Discord server](https://discord.gg/kBwvAyxEWE) to get the latest news, or if you want to contribute to RsNano.
Want to get involved? [We love contributions](https://rsnano.com/#contribute)

