<p align="center">
  <img src="https://user-images.githubusercontent.com/35740512/71934637-c8b22a00-319c-11ea-8b73-a48e7851b7d2.png" alt="ESLint Config Kit" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@eslint-kit/cli">
    <img src="https://img.shields.io/npm/v/@eslint-kit/cli">
  </a>
  <a href="https://github.com/eslint-kit/cli/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/eslint-kit/cli">
  </a>
</p>

---

The ESLint Kit CLI is a command-line interface tool that helps you to setup ESLint for your project.

It can:

- Setup configs from [eslint-config-kit](https://github.com/eslint-kit/eslint-config-kit) automatically.  
  **(JSON / YAML eslint config files are supported)**

- Install and manage required dependencies.  
  **(NPM / Yarn)**

- Add aliases support for `eslint-plugin-import`.  
  **(both JS and TS parsers are supported)**

- Create recommended `.prettierrc` for `kit/prettier` config.

## Usage

Using npx (recommended):

```sh
npx @eslint-kit/cli
```

Installing globally (it's good in rare cases):

```sh
npm i -g @eslint-kit/cli
eslint-kit
```

## Common options

- `-W, --workspace <name>` - use the specified yarn workspace as the working directory.

  > Currently, it installs all dependencies into the workspace's package.json. If you want to keep eslint/prettier packages in the root package.json - do it manually.

## Commands

- [Manage configs](#manage-configs)
- [Setup aliases](#setup-aliases)
- [Check](#check)

### Manage configs

Select everything you want using convenient dialogs. CLI will do everything for you.

```
$ npx @eslint-kit/cli
```

or

```
$ npx @eslint-kit/cli config
```

Accepts all [common options](#common-options).

### Setup aliases

Just enter aliases in JSON format and CLI will take care of it.

```
$ npx @eslint-kit/cli alias
```

Accepts all [common options](#common-options).

### Check

Check packages for compatibility with ESLint Kit. If some versions are not ok, CLI will offer you a way to fix it.

```
$ npx @eslint-kit/cli check
```

or

```
$ npx @eslint-kit/cli check-versions
```

Learn more about `eslint-kit` [here](https://github.com/eslint-kit/eslint-config-kit).

Accepts all [common options](#common-options).