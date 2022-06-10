import { Tree } from '@nrwl/devkit'
import { ObjectLiteralExpression } from 'ts-morph'
import { updateSourceFile } from './helpers/update-source-file'

export function apiImportModule(
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
    // Add CoreDataAccessModule Import to DataAccessModule
    source.addImportDeclaration({
      moduleSpecifier: importPackage,
      namedImports: [{ name: importClass }],
    })

    // Add CoreDataAccessModule to Imports array in DataAccessModule Class Decorator
    const sourceClass = source.getClass(targetClass)
    const sourceClassDecorator = sourceClass.getDecorator('Module')
    const sourceClassDecoratorArgs = sourceClassDecorator.getArguments()[0] as ObjectLiteralExpression
    // TODO: Make sure this works as `imports` property already exists.
    sourceClassDecoratorArgs.addPropertyAssignment({
      name: 'imports',
      initializer: `[${importClass}]`,
    })

    return source
  })
}
