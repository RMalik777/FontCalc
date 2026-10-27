import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({ GOOGLE_FONT_API_KEY: { static: true } });
