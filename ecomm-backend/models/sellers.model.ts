import { prop, getModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'

class Sellers {
  @prop({ required: true, type: String })
  name: string

  @prop({ required: true, type: String })
  orders: string
}

const SellerModel = getModelForClass(Sellers)
export default SellerModel
