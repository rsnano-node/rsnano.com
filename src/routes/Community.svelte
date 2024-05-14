<script lang="ts">
	import { Donation, Representative } from '$lib/Icon';
	import { Link, links } from '$lib/Link';
	import { NanoAddress } from '$lib/NanoAddress';
	import { Section } from '$lib/Section';
	import { YoutubeVideo } from '$lib/YoutubeVideo';
	import { DiscordIcon } from '@indaco/svelte-iconoir/discord';
	import { GitHubIcon } from '@indaco/svelte-iconoir/github';
	import { PostIcon } from '@indaco/svelte-iconoir/post';
	import { TwitterIcon } from '@indaco/svelte-iconoir/twitter';
	import { YouTubeIcon } from '@indaco/svelte-iconoir/youtube';

	const nanoDonationAddress = 'nano_1iawmcfwmmdyr7xmnordt71gpnhnao8rsk4nywq5khtmedocaj6bafk4fb8h';
	const nanoRepresentativeAddress =
		'nano_1tk8h3yzkibbsti8upkfa69wqafz6mzfzgu8bu5edaay9k7hidqdunpr4tb6';
</script>

<Section id="links" title="Links">
	<p>
		<YouTubeIcon class="inline mr-2" />
		<span
			>I do live coding on <Link data={links.youtube} /> and <Link data={links.twitch} /> once a week</span
		>
	</p>
	<p>
		<DiscordIcon class="inline mr-2" />
		<span>Join our <Link data={links.discord}>Discord server</Link> and chat with us</span>
	</p>
	<p>
		<PostIcon class="inline mr-2" />
		<span>Read our <Link data={links.blog}>Dev Blog</Link> for the latest progress reports</span>
	</p>
	<p>
		<TwitterIcon class="inline mr-2" />
		<span
			>Check out my
			<Link data={links.twitter} /> for updates</span
		>
	</p>
	<p>
		<GitHubIcon class="inline mr-2" />
		<span>Check out the source code on <Link data={links.github} /></span>
	</p>
	<p>
		Every Tuesday at <span class="font-bold">19:00 UTC</span> I do a coding live stream where I work
		on RsNano. These streams are a good starting point for new contributors. Watch it on YouTube:
	</p>
	<YoutubeVideo src="https://www.youtube-nocookie.com/embed/2OvJ6dkQbZU" />
</Section>
<Section id="contribute" title="Contribute">
	<p>
		We are happy to accept your pull requests! You would like to contribute, but you don't know
		where to start? Join <Link data={links.discord}>our Discord server</Link> and we'll find something.
	</p>
	<p>
		A good starting point to get an understanding of the code base is the official Nano Core
		Development Documentation.
	</p>
</Section>
<Section id="install" title="Install">
	<p>
		Check out our
		<Link data={links.installation}>installation guide on GitHub</Link> to get the RsNano node up and
		running!
	</p>
</Section>
<Section id="donate" title="Donate">
	<p>Would you like to support our work? Please donate to this address:</p>
	<Donation class="w-64 h-auto mx-auto" />
	<p class="text-center">
		<Link data={{ href: `nano:${nanoDonationAddress}`, external: true }} showExternalIcon linkHover>
			<NanoAddress address={nanoDonationAddress} />
		</Link>
	</p>
</Section>
<Section id="representative" title="Principal Representative">
	<p>
		We operate a beefy Principal Representative hosted in Falkenstein, Germany by Hetzner. Please
		feel free to choose us as your representative:
	</p>
	<Representative class="w-64 h-auto mx-auto" />
	<p class="text-center">
		<Link
			data={{ href: `nanorep:${nanoRepresentativeAddress}`, external: true }}
			showExternalIcon
			linkHover
		>
			<NanoAddress address={nanoRepresentativeAddress} />
		</Link>
	</p>
	<p>
		Our representative currently runs the official nano-node. We will switch to RsNano-node at some
		point in the future.
	</p>
	<p>
		Check out the <Link data={links.nodeMonitor} /> for further information.
	</p>
</Section>
