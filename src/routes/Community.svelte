<script lang="ts">
	import { ExternalLink } from '$lib/ExternalLink';
	import { Donation } from '$lib/Icon';
	import { Representative } from '$lib/Icon';
	import { NanoAddress } from '$lib/NanoAddress';
	import {
		DiscordIcon,
		GitHubIcon,
		PostIcon,
		TwitterIcon,
		YouTubeIcon
	} from '@indaco/svelte-iconoir';
	import { Section } from '$lib/Section';

	const nanoDonationAddress = 'nano_1iawmcfwmmdyr7xmnordt71gpnhnao8rsk4nywq5khtmedocaj6bafk4fb8h';
	const nanoRepresentativeAddress =
		'nano_1tk8h3yzkibbsti8upkfa69wqafz6mzfzgu8bu5edaay9k7hidqdunpr4tb6';
</script>

<Section id="links" title="Links">
	<p>
		<YouTubeIcon class="inline mr-2" />
		<span
			>I do live coding on <ExternalLink href="https://www.youtube.com/@gschauwecker">
				YouTube
			</ExternalLink> and
			<ExternalLink href="https://www.twitch.tv/gschauwecker">Twitch</ExternalLink>
			once a week</span
		>
	</p>
	<p>
		<DiscordIcon class="inline mr-2" />
		<span
			>Join our <ExternalLink href="https://discord.gg/kBwvAyxEWE">Discord server</ExternalLink> and
			chat with us</span
		>
	</p>
	<p>
		<PostIcon class="inline mr-2" />
		<span>Read our <a href="/blog">Dev Blog</a> for the latest progress reports</span>
	</p>
	<p>
		<TwitterIcon class="inline mr-2" />
		<span
			>Check out my
			<ExternalLink href="https://twitter.com/gschauwecker">Twitter</ExternalLink> for updates</span
		>
	</p>
	<p>
		<GitHubIcon class="inline mr-2" />
		<span
			>Check out the source code on <ExternalLink href="https://github.com/simpago/rsnano-node">
				GitHub
			</ExternalLink></span
		>
	</p>
	<p>
		Every Tuesday at <span class="font-bold">19:00 UTC</span> I do a coding live stream where I work
		on RsNano. These streams are a good starting point for new contributors. Watch it on YouTube:
	</p>
	<iframe
		class="mx-auto w-1/2 aspect-video"
		src="https://www.youtube.com/embed/2OvJ6dkQbZU"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen={true}
	/>
</Section>
<Section id="contribute" title="Contribute">
	<p>
		We are happy to accept your pull requests! You would like to contribute, but you don't know
		where to start? Join <ExternalLink href="https://discord.gg/kBwvAyxEWE">
			our Discord server
		</ExternalLink> and we'll find something.
	</p>
	<p>
		A good starting point to get an understanding of the code base is the official Nano Core
		Development Documentation.
	</p>
</Section>
<Section id="install" title="Install">
	<p>
		Check out our
		<ExternalLink href="https://github.com/simpago/rsnano-node#installation">
			installation guide on GitHub
		</ExternalLink> to get the RsNano node up and running!
	</p>
</Section>
<Section id="donate" title="Donate">
	<p>Would you like to support our work? Please donate to this address:</p>
	<Donation class="w-64 h-auto mx-auto" />
	<p class="text-center">
		<ExternalLink href="nano:{nanoDonationAddress}" showIcon>
			<NanoAddress address={nanoDonationAddress} />
		</ExternalLink>
	</p>
</Section>
<Section id="representative" title="Principal Representative">
	<p>
		We operate a beefy Principal Representative hosted in Falkenstein, Germany by Hetzner. Please
		feel free to choose us as your representative:
	</p>
	<Representative class="w-64 h-auto mx-auto" />
	<p class="text-center">
		<ExternalLink href="nanorep:{nanoRepresentativeAddress}" showIcon>
			<NanoAddress address={nanoRepresentativeAddress} />
		</ExternalLink>
	</p>
	<p>
		Our representative currently runs the official nano-node. We will switch to RsNano-node at some
		point in the future.
	</p>
	<p>
		Check out the <ExternalLink href="https://monitor.rsnano.com/">Node Monitor</ExternalLink> for further
		information.
	</p>
</Section>
