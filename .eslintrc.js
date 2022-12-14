module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json"
    },
    env: {
        es6: true,
        mocha: true,
        node: true
    },
    plugins: ["import", "@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/@typescript-eslint",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    rules: {
        // eslint
        "no-unused-expressions": "error",
        "no-unused-vars": ["error", { args: "after-used" }],
        "no-shadow": "error",
        "key-spacing": "error",
        "object-curly-spacing": ["error", "always"],
        "semi": ["error", "always"],

        // import
        "import/no-internal-modules": ["error", { allow: ["test/*", "module-alias/*"] }],
        "import/no-unresolved": ["error", { ignore: ["@"] }],
        "import/no-cycle": "error",

        // typescript-eslint
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-use-before-define": ["error", "nofunc"],
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-readonly": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/unbound-method": "error",
        "@typescript-eslint/no-explicit-any": "off"
    },
    overrides: [
        {
            files: ["*.unit.ts"],
            rules: {
                "no-unused-expressions": "off"
            }
        }
    ]
};
