export const APP_KEY_PREFIX = 'app'

// We use the 'appKey' to identify a specific app in a specific environment.
// The appKey is a combination of the environment and the index of the app in that environment.
// The appKey is used to identify the app in the database and in the cache and internal API requests.
export function getAppKey(environment: string, index: number): string {
  return `${APP_KEY_PREFIX}-${index}-${environment}`
}

export function parseAppKey(appKey: string): { environment: string; index: number } {
  // Remove the prefix from the appKey
  const clean = appKey.replace(`${APP_KEY_PREFIX}-`, '')
  // The first part of the appKey is the index of the app
  const [index] = clean.split('-')
  // The rest of the appKey is the environment
  const environment = clean.replace(`${index}-`, '')

  return { environment, index: Number(index) }
}
