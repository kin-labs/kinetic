import fetch from 'cross-fetch'

export class Http {
  constructor(readonly endpoint: string) {}

  async get(url): Promise<any> {
    const config = await fetch(this.endpoint + url)
    return await config.json()
  }
}
