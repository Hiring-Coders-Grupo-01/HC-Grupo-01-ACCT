import type { InstanceOptions, IOContext} from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Order extends ExternalClient {

    constructor(context: IOContext, options?: InstanceOptions) {
        super('', context, options)
    }

    public async getOrder(ctx: any, orderId: any): Promise<any> {
        return this.http.get(
          `https://${ctx.vtex.account}.vtexcommercestable.com.br/api/oms/pvt/orders/${orderId}`,
          {
            headers: {
                VtexIdclientAutCookie: ctx.vtex.authToken,
            },
          }
        )
    }

    public async getEmail(ctx: any, userId: any): Promise<any> {
        return this.http.get(
          `https://${ctx.vtex.account}.vtexcommercestable.com.br/api/dataentities/CL/search?_fields=email&_where=userId%3D${userId}&_schema=CL&_keyword=String%20to%20search&_sort=firstName%20ASC`,
          {
            headers: {
                VtexIdclientAutCookie: ctx.vtex.authToken,
            },
          }
        )
    }
}