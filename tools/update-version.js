const { join } = require('path')
const { existsSync, writeFileSync } = require('fs-extra')
const { execSync } = require('child_process')

// Check if the argument is a valid package
const pkg = process.argv[2]
const packages = ['keypair', 'sdk', 'solana']

if (!pkg || !packages.includes(pkg)) {
  console.log(`WRONG PACKAGE... ${pkg}`)
  return
}

const projects = {
  'api-core-data-access': 'libs/api/core/data-access',
  keypair: 'libs/keypair',
  sdk: 'libs/sdk',
  solana: 'libs/solana',
}

if (!projects[pkg]) {
  console.log(`CAN'T FIND PACKAGE IN WORKSPACE... ${pkg}`)
  return
}

const pkgPath = projects[pkg]

// Check if version.ts can be found in the package
const file = join(process.cwd(), pkgPath, 'src', 'version.ts')
if (!existsSync(file)) {
  console.log(`FILE NOT FOUND: ${file}`)
  return
}

// Check if package.json can be found in the package
const packageJson = join(process.cwd(), pkgPath, 'package.json')
if (!existsSync(packageJson)) {
  console.log(`FILE NOT FOUND: ${packageJson}`)
  return
}

// Get 'name' and 'version' from package.json
const { name: NAME, version: VERSION } = require(packageJson)

// Write to file and format code
writeFile(file, NAME, VERSION)
writeFile(join(process.cwd(), projects['api-core-data-access'], 'src/version.ts'), NAME.replace(pkg, 'api'), VERSION)

function writeFile(file, NAME, VERSION) {
  // Declare consts and exports
  const CONST_NAME = `export const NAME = '${NAME}'`
  const CONST_VERSION = `export const VERSION = '${VERSION}'`

  writeFileSync(file, [CONST_NAME, CONST_VERSION].join('\n'))
  execSync(`prettier --write ${file}`)
  console.log(` => Updating ${file}`, { NAME, VERSION })
}
