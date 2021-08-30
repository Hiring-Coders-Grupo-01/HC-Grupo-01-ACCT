import { IOClients } from '@vtex/api'
import { OMS } from '@vtex/clients'
import Order from './orders'
import Aws from './aws'
import Status from './status'


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }
  
  public get order() {
    return this.getOrSet('order', Order)
  }
  
  public get aws() {
    return this.getOrSet('aws', Aws)
  }
  
  public get oms() {
    return this.getOrSet('oms', OMS)
  }
}
