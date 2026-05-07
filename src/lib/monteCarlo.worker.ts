/**
 * Web Worker for off-thread Monte Carlo simulation.
 * Vite module workers — import paths resolve through the same alias config.
 */
import { runMonteCarlo } from './monteCarlo';
import type { FireInputs } from '@/types';
import type { MonteCarloResult } from './monteCarlo';

export interface MCWorkerRequest {
  id: number;
  inputs: FireInputs;
  numSimulations: number;
  targetFireAge?: number;
  randomSamples?: number[][];
}

export interface MCWorkerResponse {
  id: number;
  result: MonteCarloResult;
}

self.onmessage = (e: MessageEvent<MCWorkerRequest>) => {
  const { id, inputs, numSimulations, targetFireAge, randomSamples } = e.data;
  const result = runMonteCarlo(inputs, numSimulations, targetFireAge, randomSamples);
  (self as unknown as Worker).postMessage({ id, result } satisfies MCWorkerResponse);
};
