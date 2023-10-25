<script lang="ts">
	import { LogoText } from '$lib/Icon';
	import { DiscordIcon, TvIcon, TwitterIcon, YouTubeIcon } from '@indaco/svelte-iconoir';
</script>

<div class="bg-base-200">
	<footer class="footer p-10 prose max-w-6xl mx-auto">
		<aside>
			<span class="flex flex-col">
				<LogoText />
				<span class="my-2">A Rust port of Nano</span>
			</span>

			<a href="https://github.com/simpago/rsnano-node" class="link link-hover">Github</a>
			<a href="/legal" class="link link-hover">Legal</a>
		</aside>
		<nav>
			<header class="footer-title">Community</header>
			<a
				href="https://www.youtube.com/@gschauwecker"
				class="link link-hover inline-flex items-center gap-1"
			>
				<YouTubeIcon class="inline mr-1 w-4" /> YouTube
			</a>
			<a
				href="https://www.twitch.tv/gschauwecker"
				class="link link-hover inline-flex items-center gap-1"
			>
				<TvIcon class="inline mr-1 w-4" /> Twitch
			</a>
			<a
				href="https://discord.gg/kBwvAyxEWE"
				class="link link-hover inline-flex items-center gap-1"
			>
				<DiscordIcon class="inline mr-1 w-4" /> Discord
			</a>
			<a
				href="https://twitter.com/gschauwecker"
				class="link link-hover inline-flex items-center gap-1"
			>
				<TwitterIcon class="inline mr-1 w-4" /> Twitter
			</a>
		</nav>
		<nav>
			<header class="footer-title">Other</header>
			<a href="/blog" class="link link-hover">Blog</a>
			<a href="https://monitor.rsnano.com" class="link link-hover">Node Monitor</a>
		</nav>
	</footer>
</div>
