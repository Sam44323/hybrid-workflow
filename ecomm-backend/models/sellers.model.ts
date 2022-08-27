import { prop, getModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import ProductModel from './products.model'

class Sellers {
  @prop({ required: true, type: String })
  name: string

  @prop({ required: true, type: String })
  email: string

  @prop({ type: Array<mongoose.Schema.Types.ObjectId>, default: [], ref: ProductModel })
  catalogue: mongoose.Schema.Types.ObjectId[]
}

const SellerModel = getModelForClass(Sellers)
export default SellerModel
