import { prop, getModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'

class Buyers {
  @prop({ required: true, type: String })
  name: string

  @prop({ required: true, type: String })
  orders: string
}

const BuyerModel = getModelForClass(Buyers)
export default BuyerModel
