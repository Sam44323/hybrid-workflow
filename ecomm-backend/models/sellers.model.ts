import { prop, getModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'

class Sellers {
  @prop({ required: true, type: String })
  name: string

  @prop({ required: true, type: String })
  orders: string

  @prop({ required: true, type: mongoose.Schema.Types.ObjectId, default: [] })
  catalogue: mongoose.Schema.Types.ObjectId[]
}

const SellerModel = getModelForClass(Sellers)
export default SellerModel
