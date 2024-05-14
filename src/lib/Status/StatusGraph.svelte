<script lang="ts">
	import { themeData } from '$lib/stores';
	import { progressData } from '$lib/utils/progress';
	import { Chart, type ScriptableContext } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	let className: string | undefined = undefined;

	export { className as class };

	export let highlight: keyof typeof progressData | undefined = undefined;

	let canvas: HTMLCanvasElement;
	let chart: Chart<'line', {}, {}>;

	const updateDataset = () => {
		const computedStyle = getComputedStyle(document.body);
		const backgroundColor = computedStyle.getPropertyValue('--b1');
		const primaryColor = computedStyle.getPropertyValue('--p');
		const baseContentColor = computedStyle.getPropertyValue('--bc');

		const data = Object.entries(progressData);

		const highlightFunction = <T,>(
			defaultValue: T,
			highlightValue: T
		): ((ctx: ScriptableContext<'line'>) => T) => {
			return (ctx) => {
				const [key, _] = data[ctx.dataIndex];
				return key === highlight ? highlightValue : defaultValue;
			};
		};

		chart.data.datasets = [
			{
				label: 'Rust',
				data: data.map(([key, value]) => value),
				yAxisID: 'y',
				fill: true,
				backgroundColor: `oklch(${primaryColor} / 10%)`,
				borderColor: `oklch(${primaryColor} / 80%)`,
				pointBackgroundColor: `oklch(${backgroundColor} / 100%)`,
				pointStyle: 'circle',
				pointBorderColor: highlightFunction(
					`oklch(${baseContentColor} / 25%)`,
					`oklch(${baseContentColor} / 50%)`
				),
				pointHoverBorderColor: `oklch(${baseContentColor} / 100%)`,
				pointBorderWidth: highlightFunction(2, 4),
				pointHoverBorderWidth: highlightFunction(2, 4),
				pointRadius: highlightFunction(6, 10),
				pointHoverRadius: highlightFunction(8, 12)
			}
		];

		chart.update();
	};

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: Object.keys(progressData).map((d) => new Date(d)),
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

<div class={twMerge('max-w-full max-h-full', className)}>
	<canvas id="status-canvas" class="w-full h-full" bind:this={canvas} />
</div>
