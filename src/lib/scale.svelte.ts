import { createContext } from "svelte";

import { calculate, PXtoREM } from "$lib/function/calculator";
import { defaults, html_steps, ratios, REM_BASE } from "$lib/constant/config";
import type { GoogleFont } from "$lib/fonts";

export type Unit = "px" | "rem";
export type Naming = "numbered" | "html";
export type RatioPreset = (typeof ratios)[number]["value"];

export interface Step {
	/** Text shown next to the step, e.g. "+2" or "h4". */
	label: string;
	/** Identifier used in the CSS output, e.g. "2" or "h4". */
	name: string;
	level: number;
	/** Exact size in pixels, before unit conversion and rounding. */
	px: number;
	/** Size in the selected unit, rounded when rounding is on. */
	value: number;
}

function stepLabel(level: number) {
	if (level === 0) return "0";
	return level > 0 ? `+${level}` : `-${Math.abs(level)}`;
}

export class Scale {
	ratio_preset: RatioPreset = $state(defaults.ratio_preset);
	custom_ratio: number | null | undefined = $state(defaults.custom_ratio);
	base_size: number | null | undefined = $state(defaults.base_size);
	unit: Unit = $state(defaults.unit);
	naming: Naming = $state(defaults.naming);
	actual_size = $state<boolean>(defaults.actual_size);
	rounding = $state<boolean>(defaults.rounding);
	digits: number | null | undefined = $state(defaults.digits);
	sample = $state<string>(defaults.sample);
	largest = $state<number>(defaults.largest);
	smallest = $state<number>(defaults.smallest);
	/** Google Fonts family for the preview. Null shows the default serif. */
	typeface = $state.raw<GoogleFont | null>(null);

	ratio = $derived(
		this.ratio_preset === "custom" ? (this.custom_ratio ?? NaN) : parseFloat(this.ratio_preset),
	);
	ratio_valid = $derived(Number.isFinite(this.ratio) && this.ratio > 1);
	base_valid = $derived(
		typeof this.base_size === "number" && Number.isFinite(this.base_size) && this.base_size > 0,
	);
	valid = $derived(this.ratio_valid && this.base_valid);

	steps: Step[] = $derived.by(() => {
		if (!this.valid) return [];
		const base = this.base_size as number;
		const levels =
			this.naming === "html"
				? html_steps
				: Array.from({ length: this.largest - this.smallest + 1 }, (_, i) => {
						const level = this.largest - i;
						return { name: `${level}`, level };
					});
		return levels.map(({ name, level }) => {
			const px = calculate(this.ratio, level, base);
			return {
				name,
				level,
				label: this.naming === "html" ? name : stepLabel(level),
				px,
				value: this.format(px),
			};
		});
	});

	steps_changed = $derived(
		this.largest !== defaults.largest || this.smallest !== defaults.smallest,
	);

	format(px: number) {
		const value = this.unit === "rem" ? PXtoREM(px, REM_BASE) : px;
		if (!this.rounding) return parseFloat(value.toPrecision(12));
		const digits = Math.min(Math.max(Math.trunc(this.digits ?? 0), 0), 10);
		return parseFloat(value.toFixed(digits));
	}

	/** Switching to a custom ratio starts from the ratio in use. */
	selectRatio(preset: RatioPreset) {
		if (preset === "custom" && this.ratio_valid) this.custom_ratio = this.ratio;
		this.ratio_preset = preset;
	}

	addLarger() {
		this.largest += 1;
	}
	removeLarger() {
		if (this.largest > this.smallest) this.largest -= 1;
	}
	addSmaller() {
		this.smallest -= 1;
	}
	removeSmaller() {
		if (this.smallest < this.largest) this.smallest += 1;
	}
	resetSteps() {
		this.largest = defaults.largest;
		this.smallest = defaults.smallest;
	}

	reset() {
		this.ratio_preset = defaults.ratio_preset;
		this.custom_ratio = defaults.custom_ratio;
		this.base_size = defaults.base_size;
		this.unit = defaults.unit;
		this.naming = defaults.naming;
		this.actual_size = defaults.actual_size;
		this.rounding = defaults.rounding;
		this.digits = defaults.digits;
		this.sample = defaults.sample;
		this.typeface = null;
		this.resetSteps();
	}
}

export const [getScale, setScale] = createContext<Scale>();
