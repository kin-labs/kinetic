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

// Check if version.ts can be found in the package
const file = join(process.cwd(), 'libs', pkg, 'src', 'version.ts')
if (!existsSync(file)) {
  console.log(`FILE NOT FOUND: ${file}`)
  return
}

// Check if package.json can be found in the package
const packageJson = join(process.cwd(), 'libs', pkg, 'package.json')
if (!existsSync(packageJson)) {
  console.log(`FILE NOT FOUND: ${packageJson}`)
  return
}

// Get 'name' and 'version' from package.json
const { name: NAME, version: VERSION } = require(packageJson)

// Declare consts and exports
const CONST_NAME = `export const NAME = '${NAME}'`
const CONST_VERSION = `export const VERSION = '${VERSION}'`

// Write to file and format code
writeFileSync(file, [CONST_NAME, CONST_VERSION].join('\n'))
execSync(`prettier --write ${file}`)

console.log(` => Updating ${file}`, { NAME, VERSION })
