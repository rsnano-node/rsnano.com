<script lang="ts">
	import 'chartjs-adapter-date-fns';
	import { themeData } from '$lib/stores';
	import { progressData } from '$lib/utils/progress';
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

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
				data: Object.values(progressData),
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

<canvas id="status-canvas" class="w-full h-full" bind:this={canvas} />
