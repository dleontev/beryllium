module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },

  env: {
    es6: true,
    node: true,
    browser: true
  },

  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react"],

  rules: {
    "no-console": ["error", { allow: ["warn", "error", "log"] }]
  }
};
