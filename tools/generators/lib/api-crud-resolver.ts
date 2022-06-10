import { names, Tree } from '@nrwl/devkit'
import { addImportFrom } from './helpers/add-import-from'
import { getCrudMethods } from './helpers/get-crud-methods'
import { updateSourceFile } from './helpers/update-source-file'

export function apiCrudResolver(
  tree: Tree,
  path,
  {
    app,
    name,
    npmScope,
    plural,
    targetClass,
  }: {
    app: string
    name: string
    npmScope: string
    plural: string
    targetClass: string
  },
) {
  updateSourceFile(tree, path, (source) => {
    addImportFrom(source, '@nestjs/graphql', ['Resolver', 'Query', 'Args', 'Mutation'])
    addImportFrom(source, `@${npmScope}/${names(app).fileName}/${names(name).fileName}/data-access`, [
      `${names(name).className}CreateInput`,
      `${names(name).className}UpdateInput`,
      `${names(name).className}`,
    ])
    const { findMethod, findOneMethod, createMethod, updateMethod, deleteMethod } = getCrudMethods({ name, plural })

    const statement = `return this.service.`

    let idProperty = names(`${name}-id`).propertyName
    source.getClass(targetClass).addMethods([
      {
        decorators: [{ name: 'Mutation', arguments: [`() => ${names(name).className}`, '{ nullable: true }'] }],
        name: createMethod,
        parameters: [
          {
            name: 'input',
            decorators: [{ name: 'Args', arguments: [`'input'`] }],
            type: `${names(name).className}CreateInput`,
          },
        ],
        statements: [`${statement}${createMethod}(input)`],
      },
      {
        decorators: [{ name: `Mutation`, arguments: [`() => ${names(name).className}`, '{ nullable: true }'] }],
        name: deleteMethod,
        parameters: [
          { name: `${idProperty}`, type: 'string', decorators: [{ name: 'Args', arguments: [`'${idProperty}'`] }] },
        ],
        statements: [`${statement}${deleteMethod}(${idProperty})`],
      },
      {
        decorators: [{ name: 'Query', arguments: [`() => [${names(name).className}]`, '{ nullable: true }'] }],
        name: findMethod,
        parameters: [],
        statements: [`${statement}${findMethod}()`],
      },
      {
        decorators: [{ name: 'Query', arguments: [`() => ${names(name).className}`, '{ nullable: true }'] }],
        name: findOneMethod,
        parameters: [
          { name: `${idProperty}`, type: 'string', decorators: [{ name: 'Args', arguments: [`'${idProperty}'`] }] },
        ],
        statements: [`${statement}${findOneMethod}(${idProperty})`],
      },
      {
        decorators: [{ name: 'Mutation', arguments: [`() => ${names(name).className}`, '{ nullable: true }'] }],
        name: updateMethod,
        parameters: [
          { name: `${idProperty}`, type: 'string', decorators: [{ name: 'Args', arguments: [`'${idProperty}'`] }] },
          {
            name: 'input',
            decorators: [{ name: 'Args', arguments: [`'input'`] }],
            type: `${names(name).className}UpdateInput`,
          },
        ],
        statements: [`${statement}${updateMethod}(${idProperty}, input)`],
      },
    ])

    console.log('Add Crud to Resolver', targetClass, name)

    return source
  })
}
