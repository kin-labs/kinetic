import { Tree } from '@nrwl/devkit'
import { updateSourceFile } from './helpers/update-source-file'

export function updateApiControllerDecorator(
  tree: Tree,
  path,
  {
    value,
    targetClass,
  }: {
    value: string
    targetClass: string
  },
) {
  updateSourceFile(tree, path, (source) => {
    // Update string value in Decorator of FeatureController
    source.getClass(targetClass).getDecorator('Controller').removeArgument(0).addArgument(value)
    return source
  })
}
