require('@eslint-kit/eslint-config-patch')

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