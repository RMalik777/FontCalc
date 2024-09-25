/**
 * Calculate the font size based on the level according to the base value and the constant value.
 * The constant will be the ratio of the font size increas with each level.
 * The level will be the number of times the constant will be applied to the base value.
 *
 * @example
 * ```ts
 * const p = calculate(1.618, 0, 16)
 * const h6 = calculate(1.618, 1, 16)
 * ```
 */

export function calculate(constant: number, level: number, value: number): number {
	if (level == 0) return value;
	return childCalculate(constant, level, value);
}
function childCalculate(constant: number, level: number, value: number): number {
	if (level == 0) return value;
	else if (level < 0) return childCalculate(constant, level + 1, value / constant);
	else return childCalculate(constant, level - 1, value * constant);
}

/**
 * Convert pixel to rem.
 *
 * @example
 * ```ts
 * const rem = PXtoREM(16, 16)
 * ```
 */
export function PXtoREM(value: number, base: number): number {
	return value / base;
}

/**
 * Convert rem to pixel.
 *
 * @example
 * ```ts
 * const px = REMtoPX(1, 16)
 * ```
 */
export function REMtoPX(value: number, base: number): number {
	return value * base;
}
