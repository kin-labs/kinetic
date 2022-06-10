import { Tree } from '@nrwl/devkit'
import { join } from 'path'

export function deleteFiles(tree: Tree, files: string[], root = '') {
  for (const file of files) {
    tree.delete(join(root, file))
  }
}
