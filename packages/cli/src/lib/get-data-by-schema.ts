import {
  PackageJson,
  EslintConfigMeta,
  Config,
  PrettierConfigMeta,
  PackageManager,
} from './shared-types'
import { findPackageJson } from './find-package-json'
import { getInstalledDependencies } from './get-installed-dependencies'
import { findEslintConfig } from './find-eslint-config'
import { getInstalledConfings } from './get-installed-configs'
import { getPackageManager } from './get-package-manager'
import { findPrettierConfig } from './find-prettier-config'
import { getRootDirFileNames } from './get-root-dir-file-names'
import { checkIfTsShouldBeUsed } from './check-if-ts-should-be-used'
import { getRootDir } from './get-root-dir'

type Keys<T> = Array<keyof T>

type Unpromisify<T> = {
  [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K]
}

async function unpromisify<T extends {}, O extends Unpromisify<T>>(
  object: T
): Promise<O> {
  const result: Partial<O> = {}

  for (const key in object) {
    ;(result[key] as unknown) = await object[key]
  }

  return result as O
}

interface Data {
  rootPackageJson: PackageJson
  rootDir: string
  rootDirFileNames: string[]
  packageJson: PackageJson
  installedDependencies: string[]
  eslintConfigMeta: EslintConfigMeta
  installedConfigs: Config[]
  prettierConfigMeta: PrettierConfigMeta
  packageManager: PackageManager
  useTs: boolean
}

interface ProvidedDependencies {
  updatedConfigs: Config[]
}

type ResolutionConfig = {
  [K in keyof Data]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: (...args: any[]) => Data[K] | Promise<Data[K]>
    dependencies?: Keys<Omit<Data, K>>
    fromProvidedDependencies?: Keys<ProvidedDependencies>
  }
}

const resolutionConfig: ResolutionConfig = {
  packageManager: {
    resolver: getPackageManager,
  },
  rootPackageJson: {
    resolver: findPackageJson,
  },
  rootDir: {
    resolver: getRootDir,
    dependencies: ['rootPackageJson'],
  },
  rootDirFileNames: {
    resolver: getRootDirFileNames,
    dependencies: ['rootDir'],
  },
  packageJson: {
    resolver: findPackageJson,
    dependencies: ['rootDir'],
  },
  installedDependencies: {
    resolver: getInstalledDependencies,
    dependencies: ['packageJson'],
  },
  eslintConfigMeta: {
    resolver: findEslintConfig,
    dependencies: ['rootDirFileNames', 'packageJson'],
  },
  installedConfigs: {
    resolver: getInstalledConfings,
    dependencies: ['eslintConfigMeta'],
  },
  prettierConfigMeta: {
    resolver: findPrettierConfig,
    dependencies: ['rootDirFileNames'],
  },
  useTs: {
    resolver: checkIfTsShouldBeUsed,
    dependencies: ['installedDependencies', 'installedConfigs'],
    fromProvidedDependencies: ['updatedConfigs'],
  },
}

type Async<T> = {
  [K in keyof T]: T[K] | Promise<T[K]>
}

type Schema<T> = Partial<Record<keyof T, boolean>>

type DataBySchema<T, K extends Schema<T>> = Pick<
  T,
  {
    [P in keyof T]: K[P] extends true ? P : never
  }[keyof T]
>

async function getDataBySchemaInternal<
  S extends Schema<Data>,
  D extends DataBySchema<Data, S>
>(
  schema: S,
  results: Partial<Async<Data>>,
  providedDependencies: Partial<ProvidedDependencies>
): Promise<D> {
  const resolve = async (name: keyof Data): Promise<void> => {
    const {
      resolver,
      dependencies = [],
      fromProvidedDependencies = [],
    } = resolutionConfig[name]

    if (name in results) {
      return
    }

    const dependenciesSchema: Schema<Data> = {}

    for (const dependency of dependencies) {
      dependenciesSchema[dependency] = true
    }

    ;(results[name] as unknown) = getDataBySchemaInternal(
      dependenciesSchema,
      results,
      providedDependencies
    ).then(resolverInput => {
      const requestedProvidedDependencies: Partial<ProvidedDependencies> = {}

      for (const dependency of fromProvidedDependencies) {
        requestedProvidedDependencies[dependency] =
          providedDependencies[dependency]
      }

      return resolver({
        ...requestedProvidedDependencies,
        ...resolverInput,
      })
    })
  }

  for (const field in schema) {
    if (!schema[field]) continue
    resolve(field as keyof Data)
  }

  return unpromisify(results)
}

export function getDataBySchema<S extends Schema<Data>>(
  schema: S,
  resolvedResults: Partial<Data> = {},
  providedDependencies: Partial<ProvidedDependencies> = {}
): Promise<DataBySchema<Data, S>> {
  return getDataBySchemaInternal(schema, resolvedResults, providedDependencies)
}
