import { describe, it, expect } from 'vitest';
import { calculate, PXtoREM, REMtoPX } from '$lib/function/calculator';

describe('calculator', () => {
	it('calculate', () => {
		expect(calculate(1.618, 0, 16)).toBe(16);
		expect(calculate(1.618, 1, 16)).toBe(16 * 1.618);
		expect(calculate(1.618, -1, 16)).toBe(16 / 1.618);
		expect(calculate(1.618, 0, 0)).toBe(0);
	});
	it('PXtoREM', () => {
		expect(PXtoREM(16, 16)).toBe(1);
	});
	it('REMtoPX', () => {
		expect(REMtoPX(1, 16)).toBe(16);
	});
});
