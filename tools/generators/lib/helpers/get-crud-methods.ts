import { names } from '@nrwl/devkit'

export function getCrudMethods({ name, plural }: { name: string; plural: string }) {
  const { className } = names(name)

  const findMethod = plural
  const findOneMethod = name
  const createMethod = `create${className}`
  const updateMethod = `update${className}`
  const deleteMethod = `delete${className}`

  return {
    className,
    createMethod,
    deleteMethod,
    findMethod,
    findOneMethod,
    updateMethod,
  }
}
