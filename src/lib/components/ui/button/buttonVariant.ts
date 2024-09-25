import { cva } from 'cva';

export const buttonVariant = cva({
	base: 'inline-flex w-fit items-center justify-center rounded leading-none transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50',
	variants: {
		variant: {
			default:
				'border border-neutral-200 bg-white hover:bg-neutral-200 active:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-800/20 dark:active:bg-neutral-800/20',
			secondary:
				'border border-neutral-200 bg-neutral-100 hover:bg-neutral-100/60 active:bg-neutral-100/60 dark:bg-neutral-800 dark:hover:bg-neutral-800/20 dark:active:bg-neutral-800/20'
		},
		size: {
			xs: 'h-8 px-1',
			default: 'h-9 px-2',
			lg: 'h-10 px-3'
		},
		square: {
			true: 'aspect-square',
			false: ''
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
		square: false
	}
});
