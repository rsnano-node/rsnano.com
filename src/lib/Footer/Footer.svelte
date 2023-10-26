<script lang="ts">
	import ExternalLink from '$lib/ExternalLink/ExternalLink.svelte';
	import { LogoText } from '$lib/Icon';
	import { DiscordIcon, TvIcon, TwitterIcon, YouTubeIcon } from '@indaco/svelte-iconoir';
</script>

<div class="bg-base-200 py-8">
	<footer class="footer prose max-w-6xl mx-auto">
		<aside>
			<span class="flex flex-col">
				<LogoText />
				<span class="my-2">A Rust port of Nano</span>
			</span>

			<ExternalLink href="https://github.com/simpago/rsnano-node">Github</ExternalLink>
			<a href="/legal" class="link link-hover">Legal</a>
		</aside>
		<nav>
			<header class="footer-title">Community</header>
			<ExternalLink
				href="https://www.youtube.com/@gschauwecker"
				class="inline-flex items-center gap-1"
			>
				<YouTubeIcon class="inline mr-1 w-4" /> YouTube
			</ExternalLink>
			<ExternalLink
				href="https://www.twitch.tv/gschauwecker"
				class="inline-flex items-center gap-1"
			>
				<TvIcon class="inline mr-1 w-4" /> Twitch
			</ExternalLink>
			<ExternalLink
				href="https://discord.gg/kBwvAyxEWE"
				class="link link-hover inline-flex items-center gap-1"
			>
				<DiscordIcon class="inline mr-1 w-4" /> Discord
			</ExternalLink>
			<ExternalLink
				href="https://twitter.com/gschauwecker"
				class="link link-hover inline-flex items-center gap-1"
			>
				<TwitterIcon class="inline mr-1 w-4" /> Twitter
			</ExternalLink>
		</nav>
		<nav>
			<header class="footer-title">Other</header>
			<a href="/blog" class="link link-hover">Blog</a>
			<ExternalLink href="https://monitor.rsnano.com" class="link link-hover">
				Node Monitor
			</ExternalLink>
		</nav>
	</footer>
	<p class="text-center text-sm mt-8 mb-0">
		Site build with ❤️ by <a target="_blank" href="https://github.com/luxbe">luxbe</a>
	</p>
</div>
