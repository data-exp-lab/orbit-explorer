<script lang="ts">
	import type { OrbitHandler } from '$lib/OrbitHandler';
	import { T, useThrelte } from '@threlte/core';
	import * as THREE from 'three';
	export let orbit: OrbitHandler;
	import { currentOrbitHover, drawRange } from '$lib/store';
	import { onMount } from 'svelte';
	let position: [number, number, number] = [
		orbit.positions[0],
		orbit.positions[1],
		orbit.positions[2]
	];
	let { lineWidth, color, visible, name } = orbit;

	$: position = [
		orbit.positions[($drawRange[1] - 2) * 3 + 0],
		orbit.positions[($drawRange[1] - 2) * 3 + 1],
		orbit.positions[($drawRange[1] - 2) * 3 + 2]
	];
</script>

<T.Mesh
	{position}
	on:pointerover={() => {
		$currentOrbitHover = $name;
	}}
	on:pointerout={() => {
		$currentOrbitHover = 'none';
	}}
>
	<T.SphereGeometry args={[0.1, 32, 32]} />
	<T.MeshStandardMaterial color={$color} visible={$visible} />
</T.Mesh>
