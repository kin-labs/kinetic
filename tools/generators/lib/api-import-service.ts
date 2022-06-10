import { Tree } from '@nrwl/devkit'
import { OptionalKind, ParameterDeclarationStructure, Scope } from 'ts-morph'
import { updateSourceFile } from './helpers/update-source-file'

export function apiImportService(
  tree: Tree,
  path,
  {
    importClass,
    importPackage,
    importProperty,
    targetClass,
  }: {
    importClass: string
    importPackage: string
    importProperty: string
    targetClass: string
  },
) {
  updateSourceFile(tree, path, (source) => {
    // Add DataAccessService Import to FeatureController
    source.addImportDeclaration({
      moduleSpecifier: importPackage,
      namedImports: [{ name: importClass }],
    })

    // Add DataAccessService to constructor params in FeatureController
    const param: OptionalKind<ParameterDeclarationStructure> = {
      name: importProperty,
      type: importClass,
      isReadonly: true,
      scope: Scope.Private,
    }

    source.getClass(targetClass).addConstructor({
      parameters: [param],
    })

    return source
  })
}
