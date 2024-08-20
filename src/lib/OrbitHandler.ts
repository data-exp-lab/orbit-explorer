import { writable, type Writable } from 'svelte/store';

export class OrbitHandler {
	public name: Writable<string> = writable('Orbit');
	public positions: Float32Array;
	constructor(name: string, timesteps: { [string]: number }[]) {
		this.name.set(name);
		this.positions = new Float32Array(timesteps.length * 3);
		for (const [i, timestep] of timesteps.entries()) {
			this.positions[i * 3] = timestep[`${name}_x`];
			this.positions[i * 3 + 1] = timestep[`${name}_y`];
			this.positions[i * 3 + 2] = timestep[`${name}_z`];
		}
	}
}
