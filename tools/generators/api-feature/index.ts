import { formatFiles, installPackagesTask, Tree } from '@nrwl/devkit'
import { ApiFeatureSchema, generateApiFeature } from '../lib'

export default async function (tree: Tree, schema: ApiFeatureSchema) {
  await generateApiFeature(tree, schema)
  await formatFiles(tree)

  return () => {
    installPackagesTask(tree)
  }
}
