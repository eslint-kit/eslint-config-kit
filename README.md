<p align="center">
  <img src="./logo.png" alt="ESLint Config Kit" />
</p>

<br>

---
> :warning: **The package is still in development**

ESLint Config Kit is a collection of useful ESLint configs for much more convenient project maintaining. It use only the necessary rules to provide error checking and readability improving. Nothing extra included.

Configs divided into `base` and technology-specific parts, which can be used in "modular" style.

Here is the example for TypeScript React project:

```js
{
  extends: [
    'kit/base',
    'kit/typescript',
    'kit/react',
    'kit/react-hooks'
  ]
}
```

## Overview

- [Installation](#installation)
- [Configs](#configs)
- [Advanced Usage](#advanced-usage)

### Installation

1. Install the base dependencies:
   ```sh
   npm i -D eslint eslint-config-kit eslint-plugin-import
   ```

2. Create `.eslintrc` file in the root of your project.

3. Extend the `base` config:
   ```js
   {
     extends: ['kit/base']
   }
   ```

4. To use other configs, follow the instructions in [Configs section](#configs).

### Configs

<details>
<summary><b>React</b></summary>

1. Install dependencies:
   ```sh
   npm i -D babel-eslint eslint-plugin-react
   ```

   **Note:** this config uses babel-eslint parser by default. It requires `babel/core@>=7.2.0` and a valid Babel configuration file to run. If you do not have this already set up, please see the [Babel Usage Guide](https://babeljs.io/docs/en/usage).

2. Extend from `react` config:
   ```js
   {
     extends: [
      'kit/base',
   +  'kit/react'
     ]
   }
   ```

3. Enable `react-hooks` config if you use hooks.

</details>

<details>
<summary><b>React (performant)</b></summary>

Differences with `react` config:

- Disallow using the array indexes for `key` prop.
- Disallow to use arrow functions in jsx, except for DOM components like `button`.
- Disallow to use props spreading (`{...props}`) in jsx, except for DOM components like `button`.

1. Install `react` config dependencies.

2. Extend from `react/performant` config (or replace `react` config with it):
   ```js
   {
     extends: [
      'kit/base',
   -  'kit/react',
   +  'kit/react/performant'
     ]
   }
   ```

3. Enable `react-hooks` config if you use hooks.

</details>

<details>
<summary><b>React-Hooks</b></summary>

1. Install `react` config.

2. Install dependencies:
   ```sh
   npm i -D eslint-plugin-react-hooks
   ```

3. Extend from `react-hooks` config:
   ```js
   {
     extends: [
      'kit/base',
      'kit/react',
   +  'kit/react-hooks'
     ]
   }
   ```

</details>

<details>
<summary><b>Node</b></summary>

This config just enables the `node` env, it doesn't add any rules.

1. Extend from `node` config:
   ```js
   {
     extends: [
      'kit/base',
   +  'kit/node'
     ]
   }
   ```

</details>

<details>
<summary><b>TypeScript</b></summary>

This config just enables the `node` env, it doesn't add any rules.

1. Install dependencies:
   ```sh
   npm i -D @typescript-eslint/parser @typescript-eslint/eslint-config
   ```

2. Extend from `typescript` config:
   ```js
   {
     extends: [
      'kit/base',
   +  'kit/typescript'
     ]
   }
   ```

</details>

<details>
<summary><b>Prettier</b></summary>

This config just enables the `prettier` plugin and adds `prettier/prettier` rule.

1. Install dependencies:
   ```sh
   npm i -D prettier eslint-plugin-prettier
   ```

2. Extend from `prettier` config:
   ```js
   {
     extends: [
      'kit/base',
   +  'kit/prettier'
     ]
   }
   ```

3. Create `.prettierrc` file in the root of your project add specify your formatting settings.

4. (optional) Use the recommended settings:
   ```js
   {
     "semi": false,
     "singleQuote": true,
     "tabWidth": 2,
     "quoteProps": "consistent",
     "trailingComma": "all",
     "endOfLine": "lf"
   } 
   ```

</details>

### Advanced Usage

If the standard configs do not suit you, just override the needed options.