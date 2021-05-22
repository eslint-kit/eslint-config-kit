<p align="center">
  <img src="https://user-images.githubusercontent.com/35740512/71934637-c8b22a00-319c-11ea-8b73-a48e7851b7d2.png" alt="ESLint Config Kit" />
</p>

<p align="center">
  <a href="https://github.com/risenforces/eslint-config-kit/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/risenforces/eslint-config-kit">
  </a>
</p>

---

ESLint Config Kit is a collection of useful ESLint configs for much more convenient project developing.  
It uses only the necessary rules to provide error checking and readability improving. Nothing extra included.

Configs divided into `base` and technology-specific parts, which can be used in "modular" style.

- It doesn't enforce any doubtful rules, like `prefer-default-export` in `airbnb` config.

- It helps you to write a **more readable code**.  
  Any use of implicit language mechanic will be warned.

- It's designed to be a **conflict-free**.  
  For example, `@typescript/eslint:recommended` config does not resolve conflicts with `import` plugin, but `@eslint-kit/typescript` does.

- The main goal is to create a **zero-override** config, which can be used almost in any project.

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