<p align="center">
  <img src="https://user-images.githubusercontent.com/35740512/71934637-c8b22a00-319c-11ea-8b73-a48e7851b7d2.png" alt="ESLint Config Kit" />
</p>

<p align="center">
  <a href="https://github.com/risenforces/eslint-config-kit/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/risenforces/eslint-config-kit">
  </a>
</p>

---

ESLint Kit is a collection of useful ESLint configs for much more convenient project developing:

- ⚡️ Easy and fast installation using `@eslint-kit/cli`
- ⚙️ Only necessary rules to provide error checking and readability improving.
- 🧩 Modular usage. Easily combine presets for the different technologies.
- 🔗 Almost conflict free.

Here is the example for TypeScript React project:

```js
{
  "extends": [
    "@eslint-kit/patch",
    "@eslint-kit/base",
    "@eslint-kit/typescript",
    "@eslint-kit/react"
  ],
  "parser": "@typescript-eslint/parser"
}
```

## Usage

Check out [our documentation](https://eslint-kit.gitbook.io/eslint-kit/).

## Common issues

Check out [Common issues](https://eslint-kit.gitbook.io/eslint-kit/common-issues) section in docs.

## Contributing

Check out [Contributing](https://eslint-kit.gitbook.io/eslint-kit/contributing) section in docs.
