<script lang="ts">
	import { Pane, IntervalSlider, List, type ListOptions, Folder } from 'svelte-tweakpane-ui';
	import {
		orbitList,
		numSteps,
		drawRange,
		solarGrowthFunction,
		solarGrowthFinalMass
	} from '$lib/store';
	import OrbitSettings from './OrbitSettings.svelte';
	import { onMount } from 'svelte';

	const masses: ListOptions<number> = [
		{ text: '1/10x', value: 0.1 },
		{ text: '1x', value: 1.0 },
		{ text: '2x', value: 2.0 },
		{ text: '5x', value: 5.0 },
		{ text: '10x', value: 10.0 },
		{ text: '25x', value: 25.0 },
		{ text: '50x', value: 50.0 }
	];

	const functions: ListOptions<string> = ['linear', 'exponential', 'instantaneous'];
</script>

<Pane title="Parameters" position="fixed">
	<IntervalSlider bind:value={$drawRange} min={0} max={$numSteps} step={1} />
	<List label="Solar Growth Function" bind:value={$solarGrowthFunction} options={functions} />
	<List label="Solar Final Mass" bind:value={$solarGrowthFinalMass} options={masses} />
	<Folder title="Info"></Folder>
	<Folder title="Orbiting Bodies" expanded={false}>
		{#each $orbitList as orbit}
			<OrbitSettings {orbit} />
		{/each}
	</Folder>
</Pane>
