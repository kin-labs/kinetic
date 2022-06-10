import { formatFiles, installPackagesTask, Tree } from '@nrwl/devkit'
import { ReactFeatureSchema, generateReactFeature } from '../lib'

export default async function (tree: Tree, schema: ReactFeatureSchema) {
  await generateReactFeature(tree, schema)
  await formatFiles(tree)

  return () => {
    installPackagesTask(tree)
  }
}
