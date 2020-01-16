<p align="center">
  <img src="https://user-images.githubusercontent.com/35740512/71934637-c8b22a00-319c-11ea-8b73-a48e7851b7d2.png" alt="ESLint Config Kit" />
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/eslint-config-kit">
  <img src="https://img.shields.io/github/license/risenforces/eslint-config-kit">
</p>

---

ESLint Config Kit is a collection of useful ESLint configs for much more convenient project developing. It uses only the necessary rules to provide error checking and readability improving. Nothing extra included.

Configs divided into `base` and technology-specific parts, which can be used in "modular" style.

Here is the example for TypeScript React project:

```js
{
  "extends": [
    "kit/base",
    "kit/packs/react-typescript"
  ]
}
```

## Overview

- [Installation](#installation)
- [Configs](#configs)
- [Config packs](#config-packs)
- [Troubleshooting](#troubleshooting)
- [Advanced Usage](#advanced-usage)

### Installation

1. Install the base dependencies:

   ```sh
   npm i -D eslint eslint-config-kit eslint-plugin-import
   ```

2. Create `.eslintrc` file in the root of your project.

3. Extend from `base` config:

   ```js
   {
     "extends": ["kit/base"]
   }
   ```

4. To use other configs, follow the instructions in [Configs](#configs) or [Config packs](#config-packs) sections.

### Configs

<details>
<summary><b>Base (soft)</b></summary>

Differences with `base` config:

- Allow to use `console.log`.  
- Allow to make default exports.  

Installation:

1. Replace `base` with `base/soft`:

   ```diff
   {
     "extends": [
   -   "kit/base",
   +   "kit/base/soft"
     ]
   }
   ```

</details>

<details>
<summary><b>React</b></summary>

Installation:

1. Install dependencies:

   ```sh
   npm i -D babel-eslint eslint-plugin-react eslint-plugin-react-hooks
   ```

   **Note:** `babel-eslint` requires `babel/core@>=7.2.0` and a valid Babel configuration file to run. If you do not have this already set up, please see the [Babel Usage Guide](https://babeljs.io/docs/en/usage).

2. Extend from `react` config and specify a parser:

   ```diff
   {
   + "parser": "babel-eslint",
     "extends": [
       "kit/base",
   +   "kit/react"
     ]
   }
   ```

</details>

<details>
<summary><b>React (performant)</b></summary>

Differences with `react` config:

- Disallow to use the array indexes for `key` prop.
- Disallow to use arrow functions in jsx, except for DOM components like `button`.
- Disallow to use props spreading (`{...props}`) in jsx, except for DOM components like `button`.

Installation:

1. Install `react` config dependencies.

2. Extend from `react/performant` config (or replace `react` config with it):

   ```diff
   {
     "parser": "babel-eslint",
     "extends": [
       "kit/base",
   -   "kit/react"
   +   "kit/react/performant"
     ]
   }
   ```

</details>

<details>
<summary><b>Node</b></summary>

This config just enables the `node` env, it doesn't add any rules.

Installation:

1. Extend from `node` config:

   ```diff
   {
     "extends": [
       "kit/base",
   +   "kit/node"
     ]
   }
   ```

</details>

<details>
<summary><b>TypeScript</b></summary>

Installation:

1. Install dependencies:

   ```sh
   npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
   ```

2. Extend from `typescript` config and specify a parser:

   ```diff
   {
   + "parser": "@typescript-eslint/parser",
     "extends": [
       "kit/base",
   +   "kit/typescript"
     ]
   }
   ```

</details>

<details>
<summary><b>Prettier</b></summary>

This config just enables the `prettier` plugin and adds `prettier/prettier` rule.

Installation:

1. Install dependencies:

   ```sh
   npm i -D prettier eslint-plugin-prettier
   ```

2. Extend from `prettier` config:

   ```diff
   {
     "extends": [
       "kit/base",
   +   "kit/prettier"
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
     "trailingComma": "es5",
     "endOfLine": "lf"
   } 
   ```

</details>

### Config packs

Config packs are just shortcuts for the most used config combinations.

<details>
<summary><b>React-TypeScript</b></summary>

Includes:

- `react`
- `typescript`

Installation:

1. Install dependencies:

   ```sh
   npm i -D eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin
   ```

2. Extend from `packs/react-typescript` config and specify a parser:

   ```diff
   {
   + "parser": "@typescript-eslint/parser",
     "extends": [
       "kit/base",
   +   "kit/packs/react-typescript"
     ]
   }
   ```

</details>

### Troubleshooting

<details>
<summary><b>TypeScript config issues</b></summary>

**Issue:** You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.

**Solution:** You should specify your tsconfig location manually in `parserOptions`:

```diff
{
  "parser": "@typescript-eslint/parser",
+ "parserOptions": {
+   "project": "./tsconfig.json"
+ },
  "extends": [
    "kit/base",
    "kit/typescript"
  ]
}
```

If it doesn't work, try to rename eslint config file to `.eslintrc.js` and resolve `tsconfig.json` path:

```js
const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json') // or your tsconfig location
  },
  extends: [
    'kit/base',
    'kit/typescript'
  ]
}
```

</details>

### Advanced Usage

If the standard configs do not suit you, just override the needed options.
