import { getWorkspaceLayout, names, ProjectConfiguration, readProjectConfiguration, Tree } from '@nrwl/devkit'
import { join } from 'path'
import { ObjectLiteralExpression } from 'ts-morph'
import { apiCrudController } from './api-crud-controller'
import { apiCrudResolver } from './api-crud-resolver'
import { apiCrudService } from './api-crud-service'
import { apiImportModule } from './api-import-module'
import { apiImportService } from './api-import-service'
import { addImportFrom } from './helpers/add-import-from'
import { updateSourceFile } from './helpers/update-source-file'
import { updateApiControllerDecorator } from './update-api-controller-decorator'
import { updateApiCoreFeatureModule } from './update-api-core-feature-module'

interface UpdateApiFeatureOptions {
  app: string
  coreDataAccessName: string
  coreDataAccessProject?: ProjectConfiguration
  coreFeatureName: string
  coreFeatureProject?: ProjectConfiguration
  crud: boolean
  name: string
  plural: string
}

export function updateApiFeature(
  tree: Tree,
  {
    app,
    coreDataAccessName,
    coreDataAccessProject,
    coreFeatureName,
    coreFeatureProject,
    crud,
    name,
    plural,
  }: UpdateApiFeatureOptions,
) {
  const { npmScope } = getWorkspaceLayout(tree)

  // Get the DataAccess Project Name
  const dataAccessName = `${app}-${name}-data-access`
  // Get the Feature Project Name
  const featureName = `${app}-${name}-feature`

  // Get the DataAccess Package Name
  const dataAccessPackage = `@${npmScope}/${app}/${name}/data-access`
  // Get the Feature Package Name
  const featurePackage = `@${npmScope}/${app}/${name}/feature`

  // Get the DataAccess Project
  const dataAccessProject = readProjectConfiguration(tree, dataAccessName)
  // Get the Feature Project
  const featureProject = readProjectConfiguration(tree, featureName)

  // Get the DataAccessModule Name
  const dataAccessModuleClass = `${names(dataAccessName).className}Module`
  // Get the DataAccessService Name
  const dataAccessServiceClass = `${names(dataAccessName).className}Service`
  // Get the DataAccessModule Path
  const dataAccessModulePath = join(dataAccessProject.sourceRoot, 'lib', `${dataAccessName}.module.ts`)
  // Get the DataAccessService Path
  const dataAccessServicePath = join(dataAccessProject.sourceRoot, 'lib', `${dataAccessName}.service.ts`)

  // Get the FeatureModule Name
  const featureModuleClass = `${names(featureName).className}Module`
  // Get the FeatureModule Path
  const featureModulePath = join(featureProject.sourceRoot, 'lib', `${featureName}.module.ts`)

  // Get the FeatureController Class
  const featureControllerClass = `${names(featureName).className}Controller`
  // Get the FeatureController Path
  const featureControllerPath = join(featureProject.sourceRoot, 'lib', `${featureName}.controller.ts`)
  // Get the FeatureResolver Class
  const featureResolverClass = `${names(featureName).className}Resolver`
  // Get the FeatureResolver File
  const featureResolverFile = `${featureName}.resolver.ts`

  // Get the FeatureResolver Path
  const featureResolverPath = join(featureProject.sourceRoot, 'lib', featureResolverFile)
  tree.write(
    featureResolverPath,
    tree
      .read(featureControllerPath)
      .toString()
      .replace(featureControllerClass, featureResolverClass)
      .replace(`@Controller('${names(featureName).fileName}')`, `@Resolver()`)
      .replace(`import { Controller } from '@nestjs/common';`, ''),
  )

  // Import the DataAccessModule into the FeatureModule
  apiImportModule(tree, featureModulePath, {
    importClass: dataAccessModuleClass,
    importPackage: dataAccessPackage,
    targetClass: featureModuleClass,
  })

  // Import the DataAccessService into the FeatureController
  apiImportService(tree, featureControllerPath, {
    importClass: dataAccessServiceClass,
    importPackage: dataAccessPackage,
    importProperty: 'service',
    targetClass: featureControllerClass,
  })

  // Import the DataAccessService into the FeatureController
  apiImportService(tree, featureResolverPath, {
    importClass: dataAccessServiceClass,
    importPackage: dataAccessPackage,
    importProperty: 'service',
    targetClass: featureResolverClass,
  })

  // Update the Controller decorator value from 'api-<name>-feature' to '<name>'
  updateApiControllerDecorator(tree, featureControllerPath, {
    value: `'${name}'`,
    targetClass: featureControllerClass,
  })

  if (coreDataAccessProject) {
    // Get the CoreDataAccessModule Name
    const coreDataAccessModuleClass = `${names(coreDataAccessName).className}Module`
    // Get the CoreDataAccessService Name
    const coreDataAccessServiceClass = `${names(coreDataAccessName).className}Service`

    // Get the CoreDataAccess Package Name
    const coreDataAccessPackage = `@${npmScope}/${app}/core/data-access`

    // Import CoreDataAccessModule
    apiImportModule(tree, dataAccessModulePath, {
      importClass: coreDataAccessModuleClass,
      importPackage: coreDataAccessPackage,
      targetClass: dataAccessModuleClass,
    })
    // Import CoreDataAccessService
    apiImportService(tree, dataAccessServicePath, {
      importClass: coreDataAccessServiceClass,
      importPackage: coreDataAccessPackage,
      importProperty: 'data',
      targetClass: dataAccessServiceClass,
    })
  }

  if (coreFeatureProject) {
    // Get the CoreFeatureModule Name
    const coreFeatureModuleClass = `${names(coreFeatureName).className}Module`

    // Get the CoreFeatureModule Path
    const coreFeatureModulePath = join(coreFeatureProject.sourceRoot, 'lib', `${coreFeatureName}.module.ts`)

    updateApiCoreFeatureModule(tree, coreFeatureModulePath, {
      importClass: featureModuleClass,
      importPackage: featurePackage,
      targetClass: coreFeatureModuleClass,
    })
  }

  if (crud) {
    apiCrudService(tree, dataAccessServicePath, {
      name,
      plural: plural || name,
      targetClass: dataAccessServiceClass,
    })
    apiCrudController(tree, featureControllerPath, {
      name,
      plural: plural || name,
      targetClass: featureControllerClass,
    })
    apiCrudResolver(tree, featureResolverPath, {
      app,
      name,
      npmScope,
      plural: plural || name,
      targetClass: featureResolverClass,
    })

    // Get the DataAccessService Path
    const itemCreateInputFile = `${name}-create.input`
    const itemCreateInput = join(dataAccessProject.sourceRoot, 'lib', 'dto', `${itemCreateInputFile}.ts`)
    const itemUpdateInputFile = `${name}-update.input`
    const itemUpdateInput = join(dataAccessProject.sourceRoot, 'lib', 'dto', `${itemUpdateInputFile}.ts`)
    const itemEntityFile = `${name}.entity`
    const itemEntity = join(dataAccessProject.sourceRoot, 'lib', 'entity', `${itemEntityFile}.ts`)

    tree.write(
      itemCreateInput,
      `import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ${names(name).className}CreateInput {
  @Field()
  name: string
}`,
    )
    tree.write(
      itemUpdateInput,
      `import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ${names(name).className}UpdateInput {
  @Field({ nullable: true })
  name?: string
}`,
    )
    tree.write(
      itemEntity,
      `import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ${names(name).className} {
  @Field({ nullable: true })
  name: string
}`,
    )

    const indexFile = join(dataAccessProject.sourceRoot, 'index.ts')
    tree.write(
      indexFile,
      `${tree.read(indexFile).toString()}
export * from './lib/dto/${itemCreateInputFile}'
export * from './lib/dto/${itemUpdateInputFile}'
export * from './lib/entity/${itemEntityFile}'
    `,
    )

    updateSourceFile(tree, featureModulePath, (source) => {
      // Add FeatureModule to Imports array in CoreFeatureModule Class Decorator
      const featureModuleClassSource = source.getClass(featureModuleClass)

      addImportFrom(source, `./${featureResolverFile.replace('.ts', '')}`, [featureResolverClass])
      // featureModuleClassSource.add

      const featureModuleDecorator = featureModuleClassSource.getDecorator('Module')
      const featureModuleDecoratorArgs = featureModuleDecorator.getArguments()[0] as ObjectLiteralExpression

      // Delete the existing providers array
      featureModuleDecoratorArgs.getProperty('providers').remove()

      // Add the new providers array
      featureModuleDecoratorArgs.addPropertyAssignment({
        name: 'providers',
        initializer: `[${featureResolverClass}]`,
      })

      return source
    })
  }
}
