<p align="center">
  <img src="https://user-images.githubusercontent.com/35740512/71934637-c8b22a00-319c-11ea-8b73-a48e7851b7d2.png" alt="ESLint Config Kit" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/eslint-config-kit">
    <img src="https://img.shields.io/npm/v/eslint-config-kit">
  </a>
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
    "@eslint-kit/base",
    "@eslint-kit/typescript",
    "@eslint-kit/react"
  ]
}
```

## Overview

- [Installation using ESLint Kit CLI](#installation-using-eslint-kit-cli)
- [Manual installation](#manual-installation)
- [Configs](#configs)
- [Integrating ESLint with IDEs/editors](#integrating-eslint-with-ideseditors)
- [Advanced Usage](#advanced-usage)
- [Troubleshooting](#troubleshooting)

## Installation using ESLint Kit CLI

Using npx (recommended):

```sh
npx @eslint-kit/cli
```

Installing globally (it's good in rare cases):

```sh
npm i -g @eslint-kit/cli
eslint-kit
```

Learn more on [@eslint-kit/cli page](https://github.com/eslint-kit/cli).

## Manual installation

1. Install basic dependencies:

   ```sh
   npm i -D eslint @eslint-kit/base
   ```

2. Create `.eslintrc` file in the root of your project.

3. Extend from `base` config:

   ```js
   {
     "extends": ["@eslint-kit/base"]
   }
   ```

4. Add any desired configs [here](#configs).

5. _(optional)_ Integrate ESLint into your IDE/editor [here](#integrating-eslint-with-ideseditors). 

## Configs

> **Note:** Base config does not include any formatting rules. It is strongly recommended to use `prettier` config for this purposes. Just open `Prettier` section right below.

<details>
<summary><b>Prettier</b></summary>

This config just enables the `prettier` plugin and adds `prettier/prettier` rule.

Installation:

1. Install config:

   ```sh
   npm i -D @eslint-kit/prettier
   ```

2. Extend from it:

   ```diff
   {
     "extends": [
       "@eslint-kit/base",
   +   "@eslint-kit/prettier"
     ]
   }
   ```

3. Create `.prettierrc` file in the root of your project add specify your formatting settings.

4. _(optional)_ Use the recommended settings:

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

<details>
<summary><b>React</b></summary>

Installation:

1. Install parser _(skip if you already have it)_:
   
   Choose between `babel-eslint` and `@typescript-eslint/parser`, depends on what you use.

   **Note:** `babel-eslint` requires `babel/core@>=7.2.0` and a valid Babel configuration file to run. If you do not have this already set up, please see the [Babel Usage Guide](https://babeljs.io/docs/en/usage).

2. Install config:

   ```sh
   npm i -D @eslint-kit/react
   ```

3. Extend from it and specify a parser:

   ```diff
   {
   + "parser": "babel-eslint",
     "extends": [
       "@eslint-kit/base",
   +   "@eslint-kit/react"
     ]
   }
   ```

</details>

<details>
<summary><b>Node</b></summary>

This config just enables the `node` env, it doesn't add any rules.

Installation:

1. Install config:

   ```sh
   npm i -D @eslint-kit/node
   ```

2. Extend from `node` config:

   ```diff
   {
     "extends": [
       "@eslint-kit/base",
   +   "@eslint-kit/node"
     ]
   }
   ```

</details>

<details>
<summary><b>TypeScript</b></summary>

Installation:

1. Install `@typescript-eslint/parser` parser _(skip if you already have it)_:

2. Install config:

   ```sh
   npm i -D @eslint-kit/typescript
   ```

3. Extend from `typescript` config and specify a parser:

   ```diff
   {
   + "parser": "@typescript-eslint/parser",
     "extends": [
       "@eslint-kit/base",
   +   "@eslint-kit/typescript"
     ]
   }
   ```

</details>

## Integrating ESLint with IDEs/editors

<details>
<summary><b>VSCode</b></summary>

1. Install [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

2. Choose any option you like:

   - **Fix on save.**  
     Add the following to your `settings.json`:  

     ```js
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
     ```

   - **Fix on keyboard shortcut.**  
     Add the following to your `keybindings.json`:

     ```js
     {
       "key": "alt+f", // or any other keys
       "command": "eslint.executeAutofix"
     }
     ```

</details>

## Advanced Usage

<details>
<summary><b>Add aliases to import plugin (JavaScript)</b></summary>

**Using CLI:**

```sh
npx @eslint-kit/cli alias
```

**Manually:**

1. Install dependencies:

   ```sh
   npm i -D eslint-import-resolver-alias
   ```

2. Update `.eslintrc` with your aliases:

   ```json
   {
     "settings": {
       "import/resolver": {
         "alias": {
           "map": [
             ["@folder-alias", "./src"],
             ["@file-alias", "./src/App.js"]
           ],
           "extensions": [".js", ".jsx", ".json"]
         }
       }
     },
     "rules": {
       "import/order": [
         "warn",
         {
           "groups": [
             "builtin",
             "external",
             "internal",
             "parent",
             "sibling",
             "index"
           ],
           "pathGroups": [
             {
               "pattern": "@folder-alias/**",
               "group": "internal",
               "position": "before"
             },
             {
               "pattern": "@file-alias",
               "group": "internal",
               "position": "before"
             }
           ]
         }
       ]
     }
   }
   ```

</details>

<details>
<summary><b>Add aliases to import plugin (TypeScript)</b></summary>

**Using CLI:**

```sh
npx @eslint-kit/cli alias
```

**Manually:**

1. Install dependencies:

   ```sh
   npm i -D eslint-import-resolver-typescript
   ```

2. Update `.eslintrc`:

   ```json
   {
     "settings": {
       "import/parsers": {
         "@typescript-eslint/parser": [".ts", ".tsx"]
       },
       "import/resolver": {
         "typescript": {
           "alwaysTryTypes": true
         }
       }
     },
     "rules": {
       "import/order": [
         "warn",
         {
           "groups": [
             "builtin",
             "external",
             "internal",
             "parent",
             "sibling",
             "index"
           ],
           "pathGroups": [
             {
               "pattern": "@folder-alias/**",
               "group": "internal",
               "position": "before"
             },
             {
               "pattern": "@file-alias",
               "group": "internal",
               "position": "before"
             }
           ]
         }
       ]
     }
   }
   ```
   
   **Note:** See [eslint-import-resolver-typescript README](https://github.com/alexgorbatchev/eslint-import-resolver-typescript) for the details.

</details>

## Troubleshooting

<details>
<summary><b>TypeScript config issues</b></summary>

### **Issue:**

`You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser`.

### **Solution:**

You should specify your tsconfig location manually in `parserOptions`:

```diff
{
  "parser": "@typescript-eslint/parser",
+ "parserOptions": {
+   "project": "./tsconfig.json"
+ },
  "extends": [
    "@eslint-kit/base",
    "@eslint-kit/typescript"
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
    '@eslint-kit/base',
    '@eslint-kit/typescript'
  ]
}
```

</details>
