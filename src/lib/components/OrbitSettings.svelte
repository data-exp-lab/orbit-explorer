<script lang="ts">
	import type { OrbitHandler } from '$lib/OrbitHandler';
	import { Pane, IntervalSlider, Slider, Color } from 'svelte-tweakpane-ui';
	export let orbit: OrbitHandler;

	let { color, lineWidth } = orbit;
</script>

<Slider bind:value={$lineWidth} min={0} max={2.0} step={0.05} />
<Color bind:value={$color} />
