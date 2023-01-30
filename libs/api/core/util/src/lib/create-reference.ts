/**
 * Migration to add the `type` column to the `reference` table
 * This will be removed in v1.0.0
 * @param {string} type
 * @param {string} id
 * @returns {string}
 */
export function createReference(type?: string, id?: string): string {
  // If only type is provided, return type
  if (type && !id) {
    return type
  }
  // If only id is provided, return id
  if (!type && id) {
    return id
  }
  // If both type and id are provided, return type:id
  if (type && id) {
    return `${type}|${id}`
  }
}
