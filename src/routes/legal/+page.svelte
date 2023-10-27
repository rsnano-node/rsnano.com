<script>
	import { Section } from '$lib/Section';
</script>

<svelte:head>
	<title>RsNano | Legal</title>
</svelte:head>

<section class="hero text-center min-h-[16rem] bg-base-200">
	<div class="hero-content">
		<h1 class="text-4xl font-bold m-0">Legal Information</h1>
	</div>
</section>
<main class="w-full prose px-8 md:px-16 lg:mx-auto max-w-6xl flex flex-col gap-16 py-16">
	<Section id="responsible" title="Responsible for this website">
		<div class="card bg-base-200">
			<div class="card-body">
				<span>Gustav Schauwecker</span>
				<span>Gutenbergstr. 77a</span>
				<span>c/o Coworking0711</span>
				<span>70197 Stuttgart</span>
				<span>Germany</span>
			</div>
		</div>
	</Section>
	<Section id="contact" title="Contact">
		<div class="card bg-base-200">
			<div class="card-body">
				<span>Telefon: +49 177 5338841</span>
				<span>E-Mail: gustav@gustav-schauwecker.de</span>
			</div>
		</div>
	</Section>
</main>
