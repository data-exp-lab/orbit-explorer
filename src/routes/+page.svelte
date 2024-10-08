<script lang="ts">
	import SceneParameters from '$lib/components/SceneParameters.svelte';

	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/Scene.svelte';
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import PapaParse from 'papaparse';
	import { OrbitHandler } from '$lib/OrbitHandler';
	import {
		orbitList,
		numSteps,
		drawRange,
		solarGrowthFunction,
		solarGrowthFinalMass
	} from '$lib/store';
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
	const pairedTenPalette = [
		'#a6cee3',
		'#1f78b4',
		'#b2df8a',
		'#33a02c',
		'#fb9a99',
		'#e31a1c',
		'#fdbf6f',
		'#ff7f00',
		'#cab2d6',
		'#6a3d9a',
		'#ffff99',
		'#b15928'
	];

	$: {
		if ($solarGrowthFunction && $solarGrowthFinalMass) {
			const funcName = $solarGrowthFunction;
			const finalMass = $solarGrowthFinalMass;

			const fileName = `/orbits_${funcName}_${(finalMass * 100).toString().padStart(6, '0')}.csv`;
			PapaParse.parse(fileName, {
				download: true,
				dynamicTyping: true,
				header: true,
				complete: (results) => {
					console.log(results.data);
					const newOrbits = [];
					for (const [index, body] of orbitingBodies.entries()) {
						newOrbits.push(new OrbitHandler(body, results.data, pairedTenPalette[index]));
					}
					orbitList.set(newOrbits);
					$numSteps = results.data.length;
					$drawRange = [0, $numSteps];
				}
			});
		}
	}

	onMount(() => {
		$solarGrowthFunction = 'linear';
		$solarGrowthFinalMass = 1;
	});
</script>

<SceneParameters />

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
