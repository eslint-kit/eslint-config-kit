const glob = require("glob");

function beautify({ value, name, description }) {
  return {
    value,
    name: `${name.padEnd(12, " ")} ${description}`,
  };
}

function createPath(path, parent = '') {
  const fullPath = parent ? parent + '/' + path : path

  const add = path => {
    return createPath(path, fullPath)
  }

  return {
    add,
    toString: () => fullPath
  }
}

function globMap(pattern, fn) {
  return glob
    .sync(pattern)
    .map(fn || ((path) => path))
    .map((path) => path.replace(/\/$/, ""));
}

function children({
  of: parentPath,
  map = ({ path }) => path,
  transform = paths => paths
}) {
  const paths = globMap(
    parentPath.toString() + '/*/',
    path => {
      const childrenPath = path.replace(parentPath + '/', '')
      return map({
        path,
        parentPath,
        childrenPath
    })
  })

  return transform(paths)
}

function remove(parts) {
  return path => parts.reduce((acc, part) => acc.replace(part, ''), path)
}

function exclude(paths) {
  return path => {
    const parts = path.split('/')
    const last = parts[parts.length - 1]
    return !paths.includes(last)
  }
}

function byPriority(priorities) {
  return (a, b) => {
    const priorityA = priorities[a] ?? 0
    const priorityB = priorities[b] ?? 0
    return priorityB - priorityA
  }
}

const types = [
  { value: "feat", name: "feat", description: "A new feature" },
  { value: "fix", name: "fix", description: "A bug fix" },
  { value: "docs", name: "docs", description: "Documentation only changes" },
  {
    value: "style",
    name: "style",
    description: "Changes that do not affect the meaning of the code",
  },
  {
    value: "chore",
    name: "chore",
    description: "Changes to the build process or auxiliary tools",
  },
  {
    value: "config",
    name: "config",
    description: "Changes in configuration files. Add new or remove old.",
  },
  {
    value: "refactor",
    name: "refactor",
    description: "A code change that neither fixes a bug nor adds a feature",
  },
  {
    value: "perf",
    name: "perf",
    description: "A code change that improves performance",
  },
  { value: "test", name: "test", description: "Adding missing tests" },
  { value: "revert", name: "revert", description: "Revert to a commit" },
  { value: "wip", name: "wip", description: "Work in progress" },
];

const packagesPath = createPath('packages')

const scopes = [
  // common
  "repo",

  // packages
  children({
    of: packagesPath,
    map: ({ childrenPath }) => {
      const configPrefix = 'eslint-config-'

      if (childrenPath.startsWith(configPrefix)) {
        return childrenPath.replace(configPrefix, 'config/')
      }

      return childrenPath
    }
  })
]

module.exports = {
  types: types.map(beautify),
  scopes: scopes
    // flat
    .reduce((acc, current) => acc.concat(current), [])
    // by alphabet
    .sort()
    .sort(byPriority({
      repo: 100
    }))
    .map(name => ({ name })),
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix", "revert"],
  askForBreakingChangeFirst: true,
}