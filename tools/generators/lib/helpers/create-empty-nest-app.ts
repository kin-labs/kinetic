import { getProjects, Tree } from '@nrwl/devkit'
import { applicationGenerator } from '@nrwl/nest'
import { deleteFiles } from './delete-files'

// These are the files we delete from a @nrwl/nest:app
const files = [
  'app/.gitkeep',
  'app/app.controller.spec.ts',
  'app/app.controller.ts',
  'app/app.module.ts',
  'app/app.service.spec.ts',
  'app/app.service.ts',
  'assets/.gitkeep',
  'environments/environment.prod.ts',
  'environments/environment.ts',
  'main.ts',
]

export async function createEmptyNestApp(tree: Tree, name: string) {
  // Run the Generator
  await applicationGenerator(tree, { name })

  // Get the Project
  const project = getProjects(tree).get(name)

  // Remove obsolete files
  deleteFiles(tree, files, project.sourceRoot)
}
