<script lang="ts">
	import { Link, links } from '$lib/Link';
	import { ThemeToggle } from '$lib/ThemeToggle';
	import { XmarkIcon } from '@indaco/svelte-iconoir/xmark';
</script>

<div class="flex flex-col w-full min-h-full bg-base-200 p-4">
	<div class="flex justify-between">
		<ThemeToggle />
		<label for="nav-drawer" class="drawer-button btn btn-ghost btn-square">
			<XmarkIcon />
		</label>
	</div>

	<ul class="grow menu w-full min-h-full">
		<li class="grid place-items-center">
			<Link data={links.home} showIcon linkHover />
		</li>
		<li class="grid place-items-center">
			<Link data={links.blog} showIcon linkHover />
		</li>
		<li class="grid place-items-center">
			<Link data={links.privacy} showIcon linkHover />
		</li>
		<div class="grow" />
		<div class="divider divider-vertical" />
		<div class="flex flex-wrap justify-center">
			<li class="grid place-items-center">
				<Link data={links.github} showIcon linkHover />
			</li>
			<li class="grid place-items-center">
				<Link data={links.nodeMonitor} showIcon linkHover />
			</li>
			<li class="grid place-items-center">
				<Link data={links.youtube} showIcon linkHover />
			</li>
			<li class="grid place-items-center">
				<Link data={links.twitch} showIcon linkHover />
			</li>
			<li class="grid place-items-center">
				<Link data={links.discord} showIcon linkHover />
			</li>
			<li class="grid place-items-center">
				<Link data={links.twitter} showIcon linkHover />
			</li>
		</div>
	</ul>
</div>
