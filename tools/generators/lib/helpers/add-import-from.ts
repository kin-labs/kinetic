import { SourceFile } from 'ts-morph'

export function addImportFrom(source: SourceFile, packageName: string, names: string | string[]) {
  names = Array.isArray(names) ? names : [names]
  source.addImportDeclaration({ moduleSpecifier: packageName, namedImports: names.map((name) => ({ name })) })
}
