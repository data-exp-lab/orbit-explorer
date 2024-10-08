import { writable } from 'svelte/store';
import type { OrbitHandler } from './OrbitHandler';

export const drawRange = writable<[number, number]>([0, Infinity]);
export const orbitList = writable<OrbitHandler[]>([]);
export const numSteps = writable<number>(0);
export const solarGrowthFunction = writable<string>();
export const solarGrowthFinalMass = writable<number>();
export const currentOrbitHover = writable<string>('none');
