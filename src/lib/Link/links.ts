import {
	DatabaseMonitorIcon,
	DiscordIcon,
	GitHubIcon,
	HomeIcon,
	MultiplePagesIcon,
	PrivacypolicyIcon,
	TvIcon,
	TwitterIcon,
	YouTubeIcon
} from '@indaco/svelte-iconoir';

export type LinkData = {
	href: string;
	external: boolean;
	title?: string;
	icon?: ConstructorOfATypedSvelteComponent;
};

export const links = {
	home: { href: '/', external: false, title: 'Home', icon: HomeIcon },
	blog: { href: '/blog', external: false, title: 'Blog', icon: MultiplePagesIcon },
	privacy: { href: '/privacy', external: false, title: 'Legal & Privacy', icon: PrivacypolicyIcon },
	youtubePrivacy: {
		href: 'https://policies.google.com/privacy',
		external: true,
		title: 'YouTube privacy policy'
	},
	discord: {
		href: 'https://discord.gg/kBwvAyxEWE',
		external: true,
		title: 'Discord',
		icon: DiscordIcon
	},
	github: {
		href: 'https://github.com/simpago/rsnano-node',
		external: true,
		title: 'GitHub',
		icon: GitHubIcon
	},
	nodeMonitor: {
		href: 'https://monitor.rsnano.com',
		external: true,
		title: 'Node Monitor',
		icon: DatabaseMonitorIcon
	},
	twitch: {
		href: 'https://www.twitch.tv/gschauwecker',
		external: true,
		title: 'Twitch',
		icon: TvIcon
	},
	twitter: {
		href: 'https://twitter.com/gschauwecker',
		external: true,
		title: 'Twitter',
		icon: TwitterIcon
	},
	youtube: {
		href: 'https://www.youtube.com/@gschauwecker',
		external: true,
		title: 'YouTube',
		icon: YouTubeIcon
	},
	luxbe: {
		href: 'https://github.com/luxbe',
		external: true,
		title: 'luxbe'
	},
	installation: {
		href: 'https://github.com/simpago/rsnano-node#installation',
		external: true
	}
} satisfies { [key: string]: LinkData };
