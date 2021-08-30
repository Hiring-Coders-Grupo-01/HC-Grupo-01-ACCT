import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class aws extends ExternalClient {
  
  private routes = {
    leads: '/leads',
  }
  

  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://1d0u5setve.execute-api.sa-east-1.amazonaws.com', context, options)
  }

  public async getLeads(email: string): Promise<string> {
    return this.http.get(`${this.routes.leads}?email=${email}`, {
      metric: 'leads-get',
      headers: {
      },
    })
  }

  public async postLead(name: string, email: string, phone: string): Promise<string> {
    return this.http.post(`${this.routes.leads}`, {
            "nome": name,
            "email": email,
            "telefone": phone
    }, {
      metric: 'lead-post',
      headers: {
      },
    })
  }

  public async convertLead(leadid: any): Promise<string> {
    return this.http.post(`${this.routes.leads}/${leadid}/actions/convert`, leadid, {
      metric: 'lead-post',
      headers: {
      },
    })
  }


}