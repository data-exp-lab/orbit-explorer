<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/Scene.svelte';
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import PapaParse from 'papaparse';
	import { OrbitHandler } from '$lib/OrbitHandler';
	import { orbitList } from '$lib/store';
	let autoRotate: boolean = false;
	let enableDamping: boolean = true;
	let rotateSpeed: number = 1;
	let zoomToCursor: boolean = false;
	let zoomSpeed: number = 1;
	let minPolarAngle: number = 0;
	let maxPolarAngle: number = Math.PI;
	let enableZoom: boolean = true;

	let cameraUpdate: (
		event: Event & { detail: { newPosition: THREE.Vector3; newLookAt: THREE.Vector3 } }
	) => void;

	const orbitingBodies = [
		'Sun',
		'Mercury',
		'Venus',
		'Earth',
		'Mars',
		'Jupiter',
		'Saturn',
		'Uranus',
		'Neptune',
		'Pluto'
	];

	onMount(() => {
		PapaParse.parse('/orbits_linear_0100.csv', {
			download: true,
			dynamicTyping: true,
			header: true,
			complete: (results) => {
				console.log(results.data);
				const newOrbits = [];
				for (const body of orbitingBodies) {
					newOrbits.push(new OrbitHandler(body, results.data));
				}
				orbitList.set(newOrbits);
			}
		});
	});
</script>

<div class="w-full h-dvh">
	<Canvas>
		<Scene
			bind:cameraUpdate
			{enableDamping}
			{autoRotate}
			{rotateSpeed}
			{zoomToCursor}
			{zoomSpeed}
			{minPolarAngle}
			{maxPolarAngle}
			{enableZoom}
		/>
	</Canvas>
</div>

<style>
	:global(body) {
		margin: 0;
	}

	div {
		width: 100vw;
		height: 100vh;
		background: rgb(13, 19, 32);
		background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
	}
</style>
