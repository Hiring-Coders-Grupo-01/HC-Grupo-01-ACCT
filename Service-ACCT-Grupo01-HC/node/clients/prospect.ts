import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Prospect extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://httpstat.us', context, options)
  }

  public async getProspect(prospect: number): Promise<string> {
    return this.http.get(prospect.toString(), {
      metric: 'status-get',
    })
  }

  public async getProspectWithHeaders(
    prospect: number
  ): Promise<IOResponse<string>> {
    return this.http.getRaw(prospect.toString(), {
      metric: 'status-get-raw',
    })
  }
}
