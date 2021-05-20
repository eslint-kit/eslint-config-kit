require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  "root": true,
  "extends": [
    "@eslint-kit/base",
    "@eslint-kit/typescript",
    "@eslint-kit/node",
    "@eslint-kit/prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "import/no-anonymous-default-export": [
      "error",
      {
        "allowObject": true
      }
    ]
  }
}