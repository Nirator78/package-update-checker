import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	...tseslint.configs.recommended,
  	{
		languageOptions: { 
			globals: globals.browser 
		},
		rules: {
			"no-console": "warn",
            "no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
		}
	}
];