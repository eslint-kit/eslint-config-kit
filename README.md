# [The new ESLint Kit is released!](https://github.com/eslint-kit/eslint-kit)

The new version has solved a lot of problems:
- You don't need `@eslint-kit/cli` anymore:
  - Only **one** dependency. No `eslint`, no `prettier`, no plugins, parsers, resolvers and so on.
  - Blazingly fast setup. Just install `@eslint-kit/configure`, create `.eslintrc.js` and select presets you need.
  - Very short syntax, including alises setup.
  - The order of preset calls is no longer matter
- ESLint v8 and new versions of everything
- A lot of presets, including `vue`, `solid`, `svelte`, `nest.js` and other technologies
- Automatic updates for `typescript` preset - no warnings in console
- Better version control

---

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

Check out the [Common issues](https://eslint-kit.gitbook.io/eslint-kit/common-issues) section in docs.

## Contributing

Check out the [Contributing](https://eslint-kit.gitbook.io/eslint-kit/contributing) section in docs.
