import { ProvisionedApp } from '../entity/provisioned-app.entity'

export function getProvisionedApps(envVars: string[]): ProvisionedApp[] {
  const appInfo = envVars.filter((item) => item.startsWith('APP_'))

  const appIds = appInfo
    // get the second item in `APP_1_SOMETHING
    .map((item) => item.split('_')[1])
    // only distinct values
    .filter((v, i, a) => a.indexOf(v) === i)
    // convert to number
    .map((id) => Number(id))

  return appIds.map((index) => ({
    secret: process.env[`APP_${index}_FEE_PAYER_SECRET`] || process.env[`APP_${index}_FEE_PAYER_BYTE_ARRAY`],
    index,
    name: process.env[`APP_${index}_NAME`],
    logoUrl: process.env[`APP_${index}_LOGO_URL`],
    enableWebhooks: process.env[`APP_${index}_ENABLE_WEBHOOKS`]
      ? process.env[`APP_${index}_ENABLE_WEBHOOKS`].toString().toLowerCase() === 'true'
      : false,
  }))
}
