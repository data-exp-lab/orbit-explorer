import { writable } from 'svelte/store';
import type { OrbitHandler } from './OrbitHandler';

export const orbitList = writable<OrbitHandler[]>([]);
