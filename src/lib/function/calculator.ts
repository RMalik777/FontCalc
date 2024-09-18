export function calculate(constant: number, level: number, value: number): number {
	if (level == 0) return value;
	return childCalculate(constant, level, value);
}
function childCalculate(constant: number, level: number, value: number): number {
	if (level == 0) return value;
	else if (level < 0) return childCalculate(constant, level + 1, value / constant);
	else return childCalculate(constant, level - 1, value * constant);
}

export function PXtoREM(value: number, base: number): number {
	return value / base;
}
export function REMtoPX(value: number, base: number): number {
	return value * base;
}
