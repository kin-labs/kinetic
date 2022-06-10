import { Tree } from '@nrwl/devkit'
import { ObjectLiteralExpression } from 'ts-morph'
import { updateSourceFile } from './helpers/update-source-file'

export function updateApiCoreFeatureModule(
  tree: Tree,
  path: string,
  {
    importClass,
    importPackage,
    targetClass,
  }: {
    importClass: string
    importPackage: string
    targetClass: string
  },
) {
  updateSourceFile(tree, path, (source) => {
    // Add FeatureModule Import to CoreFeatureModule
    source.addImportDeclaration({
      moduleSpecifier: importPackage,
      namedImports: [{ name: importClass }],
    })

    // Add FeatureModule to Imports array in CoreFeatureModule Class Decorator
    const featureModuleClass = source.getClass(targetClass)
    const featureModuleDecorator = featureModuleClass.getDecorator('Module')
    const featureModuleDecoratorArgs = featureModuleDecorator.getArguments()[0] as ObjectLiteralExpression

    // Create the new imports array by fetching the current one and doing a replace.
    const importsArray = featureModuleDecoratorArgs
      .getProperty('imports')
      .getLastChild()
      .getFullText()
      .replace(']', `, ${importClass}]`)

    // Delete the existing imports array
    featureModuleDecoratorArgs.getProperty('imports').remove()

    // Add the new imports array
    featureModuleDecoratorArgs.addPropertyAssignment({
      name: 'imports',
      initializer: importsArray,
    })

    return source
  })
}
