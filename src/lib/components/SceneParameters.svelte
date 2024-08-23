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

	const masses: ListOptions<number> = [2, 5, 10, 25, 50, 100];
	const functions: ListOptions<string> = ['linear', 'exponential'];
</script>

<Pane title="Parameters" position="fixed">
	<IntervalSlider bind:value={$drawRange} min={0} max={$numSteps} step={1} />
	<List label="Solar Growth Function" bind:value={$solarGrowthFunction} options={functions} />
	<List label="Solar Final Mass" bind:value={$solarGrowthFinalMass} options={masses} />
	<Folder title="Orbiting Bodies">
		{#each $orbitList as orbit}
			<OrbitSettings {orbit} />
		{/each}
	</Folder>
</Pane>
