<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { interactivity, Gizmo, OrbitControls } from '@threlte/extras';
	import Orbit from '$lib/components/Orbit.svelte';
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { orbitList } from '$lib/store';

	export let cameraUpdate: (
		event: Event & { detail: { newPosition: THREE.Vector3; newLookAt: THREE.Vector3 } }
	) => void;

	onMount(() => {
		cameraUpdate = (event) => {
			const { newPosition, newLookAt } = event.detail;
			lookAt = { x: newLookAt.x, y: newLookAt.y, z: newLookAt.z };
			position = newPosition.toArray();
			orbitTarget = newLookAt.toArray();
		};
	});
	interactivity();
	export let autoRotate: boolean;
	export let enableDamping: boolean;
	export let rotateSpeed: number;
	export let zoomToCursor: boolean;
	export let zoomSpeed: number;
	export let minPolarAngle: number;
	export let maxPolarAngle: number;
	export let enableZoom: boolean;
	let position: [number, number, number] = [1, 0.5, 1];
	let orbitTarget: [number, number, number] = [0, 0.0, 0];
	let lookAt = { x: 0, y: 0.0, z: 0 };

	let positions: Float32Array;

	onMount(() => {
		const numPoints = 1000;
		const positionsArray = new Float32Array(numPoints * 3);
		for (let i = 0; i < numPoints; i++) {
			positionsArray[i * 3 + 0] = Math.random() - 0.5;
			positionsArray[i * 3 + 1] = Math.random() - 0.5;
			positionsArray[i * 3 + 2] = Math.random() - 0.5;
		}
		positions = positionsArray;
	});
</script>

<T.PerspectiveCamera makeDefault {position} bind:target={lookAt}></T.PerspectiveCamera>
<T.PerspectiveCamera makeDefault {position} bind:target={lookAt}>
	<OrbitControls
		{enableDamping}
		{autoRotate}
		{rotateSpeed}
		{zoomToCursor}
		{zoomSpeed}
		{minPolarAngle}
		{maxPolarAngle}
		{enableZoom}
		bind:target={orbitTarget}
		bind:cursor={orbitTarget}
	/>
</T.PerspectiveCamera>

<Gizmo horizontalPlacement="left" paddingX={20} paddingY={20} />
<T.DirectionalLight position.x={1} position.y={1} position.z={1} />
<T.AmbientLight intensity={0.7} />
<T.GridHelper args={[1.0, 10]} />

{#each $orbitList as orbit}
	<Orbit {orbit} />
{/each}
