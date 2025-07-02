// backend/eslint.config.js (or eslint.config.mjs)

import js from '@eslint/js'; // Keep this import for the base config

export default [
  {
    files: ["**/*.js"], // Apply this configuration to all .js files
    languageOptions: {
      ecmaVersion: 2022, // Or your current Node.js version, e.g., 2022, 2023, 2024
      sourceType: "module", // Specify that this is an ES Module
      globals: {
        // Define global variables explicitly
        process: "readonly", // 'process' is available and should not be reassigned
        console: "readonly"  // 'console' is available and should not be reassigned
      }
    },
    rules: {
      ...js.configs.recommended.rules, // Include recommended ESLint rules
      // Add or override specific rules here if needed
      // 'no-unused-vars': 'warn', // Example: change no-unused-vars to a warning
    }
  },
    {
    files: ["**/*.test.js"],  // <-- Add this override for test files
    env: {
      jest: true,            // <-- Tell ESLint these files use Jest globals
    }
  }
];