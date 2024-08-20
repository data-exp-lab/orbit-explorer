<script lang="ts">
	import type { OrbitHandler } from '$lib/OrbitHandler';
	import { Separator, Slider, Color, Checkbox } from 'svelte-tweakpane-ui';
	export let orbit: OrbitHandler;

	let { name, color, lineWidth, visible } = orbit;
</script>

<Separator />
<Checkbox bind:value={$visible} label={$name} />
<Slider bind:value={$lineWidth} min={0} max={2.0} step={0.05} />
<Color bind:value={$color} />
