import { Tree } from '@nrwl/devkit'
import { libraryGenerator } from '@nrwl/nest'

export function generateApiLib(tree: Tree, app: string, name: string, type: 'data-access' | 'feature' | 'util') {
  return libraryGenerator(tree, {
    name: type,
    directory: `${app}/${name}`,
    tags: `scope:${app},type:${type}`,
    skipFormat: true,
    controller: type === 'feature',
    service: type === 'data-access',
    standaloneConfig: true,
  })
}
