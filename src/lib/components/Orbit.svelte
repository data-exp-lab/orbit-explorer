<script lang="ts">
	import type { OrbitHandler } from '$lib/OrbitHandler';
	import { T, useThrelte } from '@threlte/core';
	import { interactivity, Gizmo, OrbitControls } from '@threlte/extras';
	import * as THREE from 'three';
	export let orbit: OrbitHandler;
</script>

<T.Line>
	<T.BufferGeometry>
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
	<T.PointsMaterial size={0.25} />
</T.Line>
