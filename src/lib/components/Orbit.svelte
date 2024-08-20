<script lang="ts">
	import type { OrbitHandler } from '$lib/OrbitHandler';
	import { T, useThrelte } from '@threlte/core';
	import { interactivity, Gizmo, OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	export let orbit: OrbitHandler;
	import { get } from 'svelte/store';
	import { drawRange } from '$lib/store';
	let color: string = '#000000';
	let lineWidth: number = 1;
	orbit.color.subscribe((value) => {
		color = value;
	});
	orbit.lineWidth.subscribe((value) => {
		lineWidth = value;
	});
</script>

<T.Line>
	<T.BufferGeometry drawRange={{ start: $drawRange[0], count: $drawRange[1] }}>
		<T.BufferAttribute
			args={[orbit.positions, 3]}
			attach={(parent, self) => {
				parent.setAttribute('position', self);
				return () => {
					// cleanup function called when ref changes or the component unmounts
					// https://threlte.xyz/docs/reference/core/t#attach
				};
			}}
		/>
	</T.BufferGeometry>
	<T.LineBasicMaterial {color} linewidth={lineWidth} />
</T.Line>
