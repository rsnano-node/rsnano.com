---
title: 'This month in RsNano 12/2022'
date: 2022-12-29T12:03:00+01:00
draft: false
---

Welcome to the fourth issue of _This month in RsNano_! RsNano is a Rust port of the original nano-node. This is a monthly
summary of its progress and community. Want to get involved? [We love contributions](https://rsnano.com/#community).

## TLDR

- 32% ported
- Focus of this month was cleaninig up block validation and insertion
- Extracted resuable libraries
- Test suite runs 3x faster
- Dev live stream on January 10

## Roughly 32% is ported

This month we had:

- 185 commits
- 9,377 lines inserted
- 11,906 lines deleted

This changed the current line count (excluding comments and blank lines) to:

- C++: 93,061 lines
- Rust: 43,460 lines

The ported status increased by **1.4 percentage points** to 31.8%. This increase is very small because the focus this month was not on porting, but on improving code quality.

<div class="infogram-embed" data-id="79c6a743-1494-4493-a103-acaef7b750af" data-type="interactive" data-title="RsNano Progress 12/2022"></div><script>!function(e,i,n,s){var t="InfogramEmbeds",d=e.getElementsByTagName("script")[0];if(window[t]&&window[t].initialized)window[t].process&&window[t].process();else if(!e.getElementById(n)){var o=e.createElement("script");o.async=1,o.id=n,o.src="https://e.infogram.com/js/dist/embed-loader-min.js",d.parentNode.insertBefore(o,d)}}(document,0,"infogram-async");</script><div style="padding:8px 0;font-family:Arial!important;font-size:13px!important;line-height:15px!important;text-align:center;border-top:1px solid #dadada;margin:0 30px"><a href="https://infogram.com/79c6a743-1494-4493-a103-acaef7b750af" style="color:#989898!important;text-decoration:none!important;" target="_blank">RsNano Progress 12/2022</a><br><a href="https://infogram.com" style="color:#989898!important;text-decoration:none!important;" target="_blank" rel="nofollow">Infogram</a></div>

## Summary

This month only a small amount of code was ported to Rust, because most of the time was spent on improving the code quality. There were still a few ledger unit tests in C++ and these were ported to Rust and split into smaller and more focused tests. The tests were a bit too slow for my taste, so I replaced the proof of work implementation by a stub and that increased test speed by more than 3x. After that, the Rust codebase was **split into several reusable modules**:

![RsNano Crates](/blog/rsnano_crates.svg)

You can read more about this split in the article ["How to open the Nano ledger with Rust"](/blog/post/ledger-example), which also contains a code example. The general idea with these modules is that parts of the nano node can be reused by the community to develop their own tools.

Once the modules were separated out, the rest of December was invested in **improving the code for validating, inserting, and rolling back blocks** in the ledger. The code that validates new blocks and inserts them into the ledger is one of the most important parts of Nano. Unfortunately, this part has grown over the years and has become cluttered and complex. However, this part better be simple and clean, because it is the heart of the ledger. So I put **40+ hours into cleaning up** that piece of code - and it was worth it. The cleanup happened in many tiny and simple steps. Now that code doesn't look like the original at all. It is clean, focused and a lot simpler to understand. Further down in this article I go into the details of the new design.

## Live stream on Tuesday, Jan 10, at 19:30 UTC

Unfortunately, I didn't get around to creating more videos for new contributors. So instead, I'm going to try a development livestream in January. In this stream I'll be working on RsNano for two hours and you can see how Nano works under the hood, how Rust differs from C++, or you can just say hi in chat. If such a live stream is well received, I would like to do it once a month. The stream starts on Tuesday 10 January at 19:30 UTC (20:30 Berlin / 14:30 EST) on [my YouTube channel](https://www.youtube.com/channel/UCZfQyXQPp2mK57f6QeDhU_g). I will post the exact link on Reddit and Discord as the date gets closer.

## Refactoring the `LedgerProcessor`

_This section is very technical and has as target audience core devs and devs of alternative nodes._

In the original nano node, the `ledger_processor` class is responsible for the validation and insertion of a new block into the ledger. The `ledger` class uses the `ledger_processor` in the following way:

```C++
nano::process_return nano::ledger::process (nano::write_transaction const & transaction_a, nano::block & block_a)
{
	debug_assert (!constants.work.validate_entry (block_a) || constants.genesis == nano::dev::genesis);
	ledger_processor processor (*this, transaction_a);
	block_a.visit (processor);
	if (processor.result.code == nano::process_result::progress)
	{
		++cache.block_count;
	}
	return processor.result;
}
```

As you can see the `ledger_processor` implements the visitor pattern and there is a callback function for each block type. Let's have a look at one of these callback functions:

```C++
void ledger_processor::receive_block (nano::receive_block & block_a)
{
	auto hash (block_a.hash ());
	auto existing (ledger.block_or_pruned_exists (transaction, hash));
	result.code = existing ? nano::process_result::old : nano::process_result::progress; // Have we seen this block already?  (Harmless)
	if (result.code == nano::process_result::progress)
	{
		auto previous (ledger.store.block.get (transaction, block_a.hashables.previous));
		result.code = previous != nullptr ? nano::process_result::progress : nano::process_result::gap_previous;
		if (result.code == nano::process_result::progress)
		{
			result.code = block_a.valid_predecessor (*previous) ? nano::process_result::progress : nano::process_result::block_position;
			if (result.code == nano::process_result::progress)
			{
				auto account (ledger.store.frontier.get (transaction, block_a.hashables.previous));
				result.code = account.is_zero () ? nano::process_result::gap_previous : nano::process_result::progress; // Have we seen the previous block? No entries for account at all (Harmless)
				if (result.code == nano::process_result::progress)
				{
					result.code = validate_message (account, hash, block_a.signature) ? nano::process_result::bad_signature : nano::process_result::progress; // Is the signature valid (Malformed)
					if (result.code == nano::process_result::progress)
					{
						debug_assert (!validate_message (account, hash, block_a.signature));
						result.code = ledger.block_or_pruned_exists (transaction, block_a.hashables.source) ? nano::process_result::progress : nano::process_result::gap_source; // Have we seen the source block already? (Harmless)
						if (result.code == nano::process_result::progress)
						{
							nano::account_info info;
							ledger.store.account.get (transaction, account, info);
							result.code = info.head == block_a.hashables.previous ? nano::process_result::progress : nano::process_result::gap_previous; // Block doesn't immediately follow latest block (Harmless)
							if (result.code == nano::process_result::progress)
							{
								nano::pending_key key (account, block_a.hashables.source);
								nano::pending_info pending;
								result.code = ledger.store.pending.get (transaction, key, pending) ? nano::process_result::unreceivable : nano::process_result::progress; // Has this source already been received (Malformed)
								if (result.code == nano::process_result::progress)
								{
									result.code = pending.epoch == nano::epoch::epoch_0 ? nano::process_result::progress : nano::process_result::unreceivable; // Are we receiving a state-only send? (Malformed)
									if (result.code == nano::process_result::progress)
									{
										nano::block_details block_details (nano::epoch::epoch_0, false /* unused */, false /* unused */, false /* unused */);
										result.code = ledger.constants.work.difficulty (block_a) >= ledger.constants.work.threshold (block_a.work_version (), block_details) ? nano::process_result::progress : nano::process_result::insufficient_work; // Does this block have sufficient work? (Malformed)
										if (result.code == nano::process_result::progress)
										{
											auto new_balance (info.balance.number () + pending.amount.number ());
#ifdef NDEBUG
											if (ledger.store.block.exists (transaction, block_a.hashables.source))
											{
												nano::account_info source_info;
												[[maybe_unused]] auto error (ledger.store.account.get (transaction, pending.source, source_info));
												debug_assert (!error);
											}
#endif
											ledger.store.pending.del (transaction, key);
											block_a.sideband_set (nano::block_sideband (account, 0, new_balance, info.block_count + 1, nano::seconds_since_epoch (), block_details, nano::epoch::epoch_0 /* unused */));
											ledger.store.block.put (transaction, hash, block_a);
											nano::account_info new_info (hash, info.representative, info.open_block, new_balance, nano::seconds_since_epoch (), info.block_count + 1, nano::epoch::epoch_0);
											ledger.update_account (transaction, account, info, new_info);
											ledger.cache.rep_weights.representation_add (info.representative, pending.amount.number ());
											ledger.store.frontier.del (transaction, block_a.hashables.previous);
											ledger.store.frontier.put (transaction, hash, account);
											result.previous_balance = info.balance;
											ledger.stats.inc (nano::stat::type::ledger, nano::stat::detail::receive);
										}
									}
								}
							}
						}
					}
				}
				else
				{
					result.code = ledger.store.block.exists (transaction, block_a.hashables.previous) ? nano::process_result::fork : nano::process_result::gap_previous; // If we have the block but it's not the latest we have a signed fork (Malicious)
				}
			}
		}
	}
}
```

### What's wrong with this code?

Whew, this is a huge function with very deep nesting! At first glance it is not clear what is happening. And even worse is that such a function also exists for Open, Send, Change, State and Epoch blocks! There is a lot of duplicated code in those functions. Most of these checks as for example if the previous block exists were copied and pasted. Also, saving the block is very similar in all functions.

In addition, this code violates the single responsibility principle. It validates new blocks and it saves validated blocks. These are separate responsibilities and therefore should not be in the same class.

### A new design

I did not design the following solution up front. The design has emerged through many tiny refactoring steps.
Inspired by the new article
[Testing Without Mocks](https://www.jamesshore.com/v2/projects/testing-without-mocks/testing-without-mocks) by James Shore, I made sure to strictly separate infrastructure on logic:

![Block Insertion](/blog/block_insertion.svg)

As you can see, the LedgerProcessor was split into two parts:

- `BlockValidator`: Ensures that a new block meets all the rules
- `BlockInserter`: Adds a validated Block into the ledger

The `ledger::process()` function now looks like this in RsNano:

```Rust
    pub fn process(
        &self,
        txn: &mut dyn WriteTransaction,
        block: &mut BlockEnum,
    ) -> Result<(), ProcessResult> {
        let validator = BlockValidatorFactory::new(self, txn.txn(), block).create_validator();
        let instructions = validator.validate()?;
        BlockInserter::new(self, txn, block, &instructions).insert();
        Ok(())
    }
```

Here you can see the separation of validating a block and then inserting it into the ledger. This separation would allow for an optimization that Colin talked about in one of the dev meetings: The validation phase should run in a readonly transaction and only the insertion phase should use a read/write transaction. This optimization can now be made relatively easily.

Let's have a look at the new `BlockValidator`:

```Rust
impl<'a> BlockValidator<'a> {
    pub(crate) fn validate(&self) -> Result<BlockInsertInstructions, ProcessResult> {
        self.epoch_block_pre_checks()?;
        self.ensure_block_does_not_exist_yet()?;
        self.ensure_valid_predecessor()?;
        self.ensure_frontier_not_missing()?;
        self.ensure_valid_signature()?;
        self.ensure_block_is_not_for_burn_account()?;
        self.ensure_account_exists_for_none_open_block()?;
        self.ensure_no_double_account_open()?;
        self.ensure_previous_block_is_correct()?;
        self.ensure_open_block_has_link()?;
        self.ensure_no_reveive_balance_change_without_link()?;
        self.ensure_pending_receive_is_correct()?;
        self.ensure_sufficient_work()?;
        self.ensure_no_negative_amount_send()?;
        self.ensure_valid_epoch_block()?;

        Ok(self.create_instructions())
    }
}
```

As you can see, there is no more nesting. Only by reading the function names, you can understand which rules are checked. The rules themselves are also written in small and simple functions. Sometimes several smaller rules are combined into one function, e.g. `ensure_pending_receive_is_correct()`:

```Rust
impl<'a> BlockValidator<'a> {
    pub fn ensure_pending_receive_is_correct(&self) -> Result<(), ProcessResult> {
        self.ensure_source_block_exists()?;
        self.ensure_receive_block_receives_pending_amount()?;
        self.ensure_legacy_source_is_epoch_0()
    }

    fn ensure_source_block_exists(&self) -> Result<(), ProcessResult> {
        if self.is_receive() && !self.source_block_exists {
            Err(ProcessResult::GapSource)
        } else {
            Ok(())
        }
    }

    fn ensure_receive_block_receives_pending_amount(&self) -> Result<(), ProcessResult> {
        if self.is_receive() {
            match &self.pending_receive_info {
                Some(pending) => {
                    if self.amount_received() != pending.amount {
                        return Err(ProcessResult::BalanceMismatch);
                    }
                }
                None => {
                    return Err(ProcessResult::Unreceivable);
                }
            };
        }

        Ok(())
    }

    fn ensure_legacy_source_is_epoch_0(&self) -> Result<(), ProcessResult> {
        let is_legacy_receive = match self.block {
            BlockEnum::LegacyReceive(_) | BlockEnum::LegacyOpen(_) => true,
            _ => false,
        };

        if is_legacy_receive
            && self
                .pending_receive_info
                .as_ref()
                .map(|x| x.epoch)
                .unwrap_or_default()
                != Epoch::Epoch0
        {
            Err(ProcessResult::Unreceivable)
        } else {
            Ok(())
        }
    }
}
```

These small functions and the elimination of nesting make the code easy to read. By removing all code duplications, the new design is also much smaller than the original.

You can view the full code for validating and inserting a block on GitHub:
https://github.com/simpago/rsnano-node/tree/develop/rust/ledger/src/block_insertion

## Refactoring the `RollbackVisitor`

_This section is very technical and has as target audience core devs and devs of alternative nodes._

The `RollbackVisitor` has the responsibility to remove a block from the ledger. It is similar to the original LedgerProcessor. It implements the visitor pattern, has complex functions and a lot of duplicated code. Let's have a look at one of its callback functions:

```C++
void state_block (nano::state_block const & block_a) override
	{
		auto hash (block_a.hash ());
		nano::block_hash rep_block_hash (0);
		if (!block_a.hashables.previous.is_zero ())
		{
			rep_block_hash = ledger.representative (transaction, block_a.hashables.previous);
		}
		auto balance (ledger.balance (transaction, block_a.hashables.previous));
		auto is_send (block_a.hashables.balance < balance);
		nano::account representative{};
		if (!rep_block_hash.is_zero ())
		{
			// Move existing representation & add in amount delta
			auto block (ledger.store.block.get (transaction, rep_block_hash));
			debug_assert (block != nullptr);
			representative = block->representative ();
			ledger.cache.rep_weights.representation_add_dual (representative, balance, block_a.representative (), 0 - block_a.hashables.balance.number ());
		}
		else
		{
			// Add in amount delta only
			ledger.cache.rep_weights.representation_add (block_a.representative (), 0 - block_a.hashables.balance.number ());
		}

		nano::account_info info;
		auto error (ledger.store.account.get (transaction, block_a.hashables.account, info));

		if (is_send)
		{
			nano::pending_key key (block_a.hashables.link.as_account (), hash);
			while (!error && !ledger.store.pending.exists (transaction, key))
			{
				error = ledger.rollback (transaction, ledger.latest (transaction, block_a.hashables.link.as_account ()), list);
			}
			ledger.store.pending.del (transaction, key);
			ledger.stats.inc (nano::stat::type::rollback, nano::stat::detail::send);
		}
		else if (!block_a.hashables.link.is_zero () && !ledger.is_epoch_link (block_a.hashables.link))
		{
			// Pending account entry can be incorrect if source block was pruned. But it's not affecting correct ledger processing
			[[maybe_unused]] bool is_pruned (false);
			auto source_account (ledger.account_safe (transaction, block_a.hashables.link.as_block_hash (), is_pruned));
			nano::pending_info pending_info (source_account, block_a.hashables.balance.number () - balance, block_a.sideband ().source_epoch);
			ledger.store.pending.put (transaction, nano::pending_key (block_a.hashables.account, block_a.hashables.link.as_block_hash ()), pending_info);
			ledger.stats.inc (nano::stat::type::rollback, nano::stat::detail::receive);
		}

		debug_assert (!error);
		auto previous_version (ledger.store.block.version (transaction, block_a.hashables.previous));
		nano::account_info new_info (block_a.hashables.previous, representative, info.open_block, balance, nano::seconds_since_epoch (), info.block_count - 1, previous_version);
		ledger.update_account (transaction, block_a.hashables.account, info, new_info);

		auto previous (ledger.store.block.get (transaction, block_a.hashables.previous));
		if (previous != nullptr)
		{
			ledger.store.block.successor_clear (transaction, block_a.hashables.previous);
			if (previous->type () < nano::block_type::state)
			{
				ledger.store.frontier.put (transaction, block_a.hashables.previous, block_a.hashables.account);
			}
		}
		else
		{
			ledger.stats.inc (nano::stat::type::rollback, nano::stat::detail::open);
		}
		ledger.store.block.del (transaction, hash);
	}
```

In the same way that the `ledger_processor` was refactored, the `rollback_visitor` was also split:

![Block Rollback](/blog/block_rollback.svg)

There are now two phases: the `RollbackPlanner` creates `RollbackInstructions` which contain all the data needed to perform the rollback. The `RollbackInstructionsExecutor` then executes these instructions. This again results in a strict separation of logic and infrastructure. All code duplications were removed.

On the highest level, the rollback now looks like this:

```Rust
impl<'a> BlockRollbackPerformer<'a> {
    pub(crate) fn roll_back(mut self, block_hash: &BlockHash) -> anyhow::Result<Vec<BlockEnum>> {
        self.roll_back_block_and_successors(block_hash)?;
        Ok(self.rolled_back)
    }

    fn roll_back_block_and_successors(&mut self, block_hash: &BlockHash) -> anyhow::Result<()> {
        let block = self.load_block(block_hash)?;
        while self.block_exists(block_hash) {
            let head_block = self.load_account_head(&block)?;
            self.roll_back_head_block(head_block)?;
        }
        Ok(())
    }

    fn roll_back_head_block(&mut self, head_block: BlockEnum) -> Result<(), anyhow::Error> {
        let planner = RollbackPlannerFactory::new(self.ledger, self.txn.txn(), &head_block)
            .create_planner()?;
        let step = planner.roll_back_head_block()?;
        self.execute(step, head_block)?;
        Ok(())
    }

    fn execute(&mut self, step: RollbackStep, head_block: BlockEnum) -> Result<(), anyhow::Error> {
        Ok(match step {
            RollbackStep::RollBackBlock(instructions) => {
                RollbackInstructionsExecutor::new(self.ledger, self.txn, &instructions).execute();
                self.rolled_back.push(head_block);
            }
            RollbackStep::RequestDependencyRollback(dependency_hash) => {
                self.roll_back_block_and_successors(&dependency_hash)?
            }
        })
    }

```

You can view the full code for the block rollback on GitHub too: https://github.com/simpago/rsnano-node/tree/develop/rust/ledger/src/block_rollback

Refactoring all this took a lot of time, but I think it was worth it. Now you can quickly understand the rules according to which the blocks are checked. And if in the future there may be more epochs, then this code can also be easily extended. Let me know what you think about these refactorings on Discord:

## Join Us

Join our [Discord server](https://discord.gg/kBwvAyxEWE) to get the latest news, or if you want to contribute to RsNano.
