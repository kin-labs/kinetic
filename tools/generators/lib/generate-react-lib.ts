import { Tree } from '@nrwl/devkit'
import { Linter } from '@nrwl/linter'
import { libraryGenerator } from '@nrwl/react'

export function generateReactLib(
  tree: Tree,
  app: string,
  name: string,
  type: 'data-access' | 'feature' | 'ui' | 'util',
) {
  return libraryGenerator(tree, {
    name: type,
    directory: `${app}/${name}`,
    tags: `scope:${app},type:${type}`,
    skipFormat: true,
    linter: Linter.EsLint,
    skipTsConfig: false,
    style: 'none',
    unitTestRunner: 'jest',
  })
}
