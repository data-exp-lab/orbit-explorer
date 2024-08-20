import { writable, type Writable } from 'svelte/store';

export class OrbitHandler {
	public name: Writable<string> = writable('Orbit');
	public positions: Float32Array;
	public color: Writable<string> = writable('#ffffff');
	public lineWidth: Writable<number> = writable(1);
	public visible: Writable<boolean> = writable(true);
	constructor(name: string, timesteps: { [string]: number }[], color: string) {
		this.name.set(name);
		this.color.set(color);
		this.positions = new Float32Array(timesteps.length * 3);
		this.lineWidth.set(1);
		for (const [i, timestep] of timesteps.entries()) {
			this.positions[i * 3] = timestep[`${name}_x`];
			this.positions[i * 3 + 1] = timestep[`${name}_y`];
			this.positions[i * 3 + 2] = timestep[`${name}_z`];
		}
	}
}
