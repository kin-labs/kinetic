import { generateFiles, getProjects, names, Tree } from '@nrwl/devkit'
import { join } from 'path'
import { generateReactLib } from './generate-react-lib'

export interface ReactFeatureSchema {
  app: string
  name: string
  skipDataAccess?: boolean
  skipFeature?: boolean
  skipUi?: boolean
}

export async function generateReactFeature(tree: Tree, schema: ReactFeatureSchema) {
  const app = schema.app
  const name = schema.name

  if (!schema.skipDataAccess) {
    await generateProject(tree, app, name, 'data-access')
  }
  if (!schema.skipFeature) {
    await generateProject(tree, app, name, 'feature')
  }
  if (!schema.skipUi) {
    await generateProject(tree, app, name, 'ui')
  }
}

async function generateProject(tree: Tree, app: string, name: string, type: 'data-access' | 'feature' | 'ui' | 'util') {
  const projectName = `${app}-${name}-${type}`
  const substitutions = {
    ...names(name),
    type,
    app: names(app),
    tmpl: '',
  }
  await generateReactLib(tree, app, name, type)
  await generateFiles(
    tree,
    join(__dirname, 'files', type),
    getProjects(tree).get(projectName).sourceRoot,
    substitutions,
  )
}
