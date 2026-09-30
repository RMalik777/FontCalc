export const ratios = [
	{ value: "1.067", label: "Minor second" },
	{ value: "1.125", label: "Major second" },
	{ value: "1.2", label: "Minor third" },
	{ value: "1.25", label: "Major third" },
	{ value: "1.333", label: "Perfect fourth" },
	{ value: "1.414", label: "Augmented fourth" },
	{ value: "1.5", label: "Perfect fifth" },
	{ value: "1.618", label: "Golden ratio" },
	{ value: "2", label: "Octave" },
	{ value: "custom", label: "Custom" },
] as const;

export const units = [
	{ value: "px", label: "px" },
	{ value: "rem", label: "rem" },
] as const;

export const namings = [
	{ value: "numbered", label: "Numbered" },
	{ value: "html", label: "HTML tags" },
] as const;

// Steps used when naming the scale after HTML elements.
export const html_steps = [
	{ name: "h1", level: 6 },
	{ name: "h2", level: 5 },
	{ name: "h3", level: 4 },
	{ name: "h4", level: 3 },
	{ name: "h5", level: 2 },
	{ name: "h6", level: 1 },
	{ name: "p", level: 0 },
	{ name: "small", level: -1 },
];

// Browsers render 1rem as 16px unless the user changes it.
export const REM_BASE = 16;

export const defaults = {
	ratio_preset: "1.618",
	custom_ratio: 1.618,
	base_size: 16,
	unit: "px",
	naming: "numbered",
	actual_size: true,
	rounding: true,
	digits: 1,
	sample: "Sphinx of black quartz, judge my vow",
	largest: 6,
	smallest: -1,
} as const;
