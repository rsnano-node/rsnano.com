<script lang="ts">
	import { ExternalLink } from '$lib/ExternalLink';
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
				showIcon
			>
				<YouTubeIcon class="inline mr-1 w-4" /> YouTube
			</ExternalLink>
			<ExternalLink
				href="https://www.twitch.tv/gschauwecker"
				class="inline-flex items-center gap-1"
				showIcon
			>
				<TvIcon class="inline mr-1 w-4" /> Twitch
			</ExternalLink>
			<ExternalLink
				href="https://discord.gg/kBwvAyxEWE"
				class="inline-flex items-center gap-1"
				showIcon
			>
				<DiscordIcon class="inline mr-1 w-4" /> Discord
			</ExternalLink>
			<ExternalLink
				href="https://twitter.com/gschauwecker"
				class="inline-flex items-center gap-1"
				showIcon
			>
				<TwitterIcon class="inline mr-1 w-4" /> Twitter
			</ExternalLink>
		</nav>
		<nav>
			<header class="footer-title">Other</header>
			<a href="/blog" class="link link-hover">Blog</a>
			<ExternalLink href="https://monitor.rsnano.com" showIcon>Node Monitor</ExternalLink>
		</nav>
	</footer>
	<p class="text-center text-sm mt-8 mb-0">
		Site built with ❤️ by <ExternalLink href="https://github.com/luxbe" showIcon>luxbe</ExternalLink
		>
	</p>
</div>
