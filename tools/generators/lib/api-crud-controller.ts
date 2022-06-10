import { Tree } from '@nrwl/devkit'
import { addImportFrom } from './helpers/add-import-from'
import { getCrudMethods } from './helpers/get-crud-methods'
import { updateSourceFile } from './helpers/update-source-file'

export function apiCrudController(
  tree: Tree,
  path,
  {
    name,
    plural,
    targetClass,
  }: {
    name: string
    plural: string
    targetClass: string
  },
) {
  updateSourceFile(tree, path, (source) => {
    addImportFrom(source, '@nestjs/common', ['Body', 'Delete', 'Get', 'Param', 'Post'])
    const { findMethod, findOneMethod, createMethod, updateMethod, deleteMethod } = getCrudMethods({ name, plural })

    const statement = `return this.service.`

    source.getClass(targetClass).addMethods([
      {
        decorators: [{ name: 'Post', arguments: [] }],
        name: createMethod,
        parameters: [{ name: 'input', decorators: [{ name: 'Body', arguments: [] }] }],
        statements: [`${statement}${createMethod}(input)`],
      },
      {
        decorators: [{ name: `Delete`, arguments: [`':id'`] }],
        name: deleteMethod,
        parameters: [{ name: 'id', type: 'string', decorators: [{ name: 'Param', arguments: [`'id'`] }] }],
        statements: [`${statement}${deleteMethod}(id)`],
      },
      {
        decorators: [{ name: 'Get', arguments: [] }],
        name: findMethod,
        parameters: [],
        statements: [`${statement}${findMethod}()`],
      },
      {
        decorators: [{ name: 'Get', arguments: [`':id'`] }],
        name: findOneMethod,
        parameters: [{ name: 'id', type: 'string', decorators: [{ name: 'Param', arguments: [`'id'`] }] }],
        statements: [`${statement}${findOneMethod}(id)`],
      },
      {
        decorators: [{ name: 'Post', arguments: [`':id'`] }],
        name: updateMethod,
        parameters: [
          { name: 'id', type: 'string', decorators: [{ name: 'Param', arguments: [`'id'`] }] },
          { name: 'input', decorators: [{ name: 'Body', arguments: [] }] },
        ],
        statements: [`${statement}${updateMethod}(id, input)`],
      },
    ])

    console.log('Add Crud to Controller', targetClass, name)

    return source
  })
}
