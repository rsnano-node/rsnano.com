<script lang="ts">
	import { LogoText } from '$lib/Icon';
	import { Link, links } from '$lib/Link';
</script>

<div class="bg-base-200 py-8">
	<footer class="footer prose lg:max-w-6xl px-16 mx-auto">
		<aside>
			<span class="flex flex-col">
				<LogoText />
				<span class="my-2">A Rust port of Nano</span>
			</span>

			<Link data={links.github} showIcon showExternalIcon linkHover />
			<Link data={links.privacy} showIcon linkHover />
		</aside>
		<in>
			<header class="footer-title">Community</header>
			<Link data={links.youtube} showIcon showExternalIcon linkHover />
			<Link data={links.twitch} showIcon showExternalIcon linkHover />
			<Link data={links.discord} showIcon showExternalIcon linkHover />
			<Link data={links.twitter} showIcon showExternalIcon linkHover />
		</in>
		<nav>
			<header class="footer-title">Other</header>
			<Link data={links.blog} showIcon linkHover />
			<Link data={links.nodeMonitor} showIcon showExternalIcon linkHover />
		</nav>
	</footer>
	<p class="text-center text-sm mt-8 mb-0">
		Site built with ❤️ by <Link data={links.luxbe} showExternalIcon linkHover />
	</p>
</div>
