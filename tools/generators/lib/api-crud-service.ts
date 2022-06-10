import { names, Tree } from '@nrwl/devkit'
import { addImportFrom } from './helpers/add-import-from'
import { getCrudMethods } from './helpers/get-crud-methods'
import { updateSourceFile } from './helpers/update-source-file'

export function apiCrudService(
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
    addImportFrom(source, `./dto/${names(name).fileName}-create.input`, [`${names(name).className}CreateInput`])
    addImportFrom(source, `./dto/${names(name).fileName}-update.input`, [`${names(name).className}UpdateInput`])
    const { className, createMethod, deleteMethod, findMethod, findOneMethod, updateMethod } = getCrudMethods({
      name,
      plural,
    })
    const statement = `return this.data.${name}`

    source.getClass(targetClass).addMethods([
      {
        name: createMethod,
        parameters: [{ name: 'data', type: `${className}CreateInput` }],
        statements: [`${statement}.create({ data })`],
      },
      {
        name: deleteMethod,
        parameters: [{ name: 'id', type: 'string' }],
        statements: [`${statement}.delete({ where: { id }})`],
      },
      {
        name: findMethod,
        parameters: [],
        statements: [`${statement}.findMany()`],
      },
      {
        name: findOneMethod,
        parameters: [{ name: 'id', type: 'string' }],
        statements: [`${statement}.findUnique({ where: { id }})`],
      },
      {
        name: updateMethod,
        parameters: [
          { name: 'id', type: 'string' },
          { name: 'data', type: `${className}UpdateInput` },
        ],
        statements: [`${statement}.update({ where: { id }, data })`],
      },
    ])

    console.log('Add Crud to Service', targetClass, name)

    return source
  })
}
