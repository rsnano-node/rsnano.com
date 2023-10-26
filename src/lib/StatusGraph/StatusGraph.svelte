<script lang="ts">
	import { Section } from '$lib/Section';
	import { themeData } from '$lib/stores';
	import { Chart } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { onMount } from 'svelte';

	const data = {
		'2022-03': 9.05,
		'2022-04': 9.67,
		'2022-05': 11.67,
		'2022-06': 16.18,
		'2022-07': 17.61,
		'2022-08': 20.33,
		'2022-09': 23.64,
		'2022-10': 25.13,
		'2022-11': 30.39,
		'2022-12': 31.83,
		'2023-01': 32.6,
		'2023-02': 32.67,
		'2023-03': 34.94,
		'2023-04': 36.51,
		'2023-05': 36.46,
		'2023-06': 37.7,
		'2023-07': 37.81,
		'2023-08': 39.7,
		'2023-09': 40.55
	};

	let canvas: HTMLCanvasElement;
	let chart: Chart;

	const updateDataset = () => {
		const computedStyle = getComputedStyle(document.body);
		const backgroundColor = computedStyle.getPropertyValue('--b1');
		const primaryColor = computedStyle.getPropertyValue('--p');
		const baseContentColor = computedStyle.getPropertyValue('--bc');

		chart.data.datasets = [
			{
				label: 'Rust',
				data: Object.values(data),
				yAxisID: 'y',
				fill: true,
				backgroundColor: `hsl(${primaryColor} / 10%)`,
				borderColor: `hsl(${primaryColor} / 80%)`,
				pointBackgroundColor: `hsl(${backgroundColor})`,
				pointBorderColor: `hsl(${baseContentColor} / 25%)`,
				pointHoverBorderColor: `hsl(${baseContentColor} / 50%)`,
				pointBorderWidth: 2,
				pointHoverBorderWidth: 2,
				pointStyle: 'circle',
				pointRadius: 6,
				pointHoverRadius: 8
			}
		];

		chart.update();
	};

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: Object.keys(data).map((d) => new Date(d)),
				datasets: []
			},
			options: {
				animation: {
					easing: 'easeInOutCubic'
				},
				maintainAspectRatio: false,
				scales: {
					x: {
						type: 'time',
						grid: {
							display: false
						},
						border: {
							display: false
						},
						time: {
							unit: 'month'
						}
					},
					y: {
						grid: {
							display: false
						},
						beginAtZero: true,
						min: 0,
						ticks: {
							stepSize: 10,
							callback: function (label, _index, _ticks) {
								return `${label} %`;
							}
						},
						stacked: true,
						border: {
							display: false
						}
					}
				},
				plugins: {
					tooltip: {
						callbacks: {
							label: (chart) => {
								const value = chart.dataset.data[chart.dataIndex] as number;
								return `${chart.dataset.label}: ${value.toFixed(2)} %`;
							}
						}
					},
					legend: {
						display: false
					}
				}
			}
		});

		updateDataset();

		// recalculate colors when theme changes
		themeData.subscribe(updateDataset);
	});
</script>

<Section id="status" title="Current Status">
	<p>Visit the <a href="/blog">dev blog</a> for the latest progress report.</p>
	<p>We keep track of how much C++ code is already translated:</p>
	<div class="w-full max-h-96 flex gap-16 items-center">
		<div class="shrink-0">
			<h1 class="text-6xl my-0">
				<span class="text-primary">{Object.values(data).at(-1)}</span> %
			</h1>
			<p class="mt-2">of the codebase is currently written in Rust.</p>
		</div>
		<div class="grow max-h-full mt-16">
			<canvas id="status-canvas" class="mx-auto w-full h-auto" bind:this={canvas} />
		</div>
	</div>
</Section>
