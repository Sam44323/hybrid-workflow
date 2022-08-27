import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import mongoose from 'mongoose'

class Sellers {
  @prop({ required: true, type: String })
  name: string

  @prop({ required: true, type: String })
  email: string

  @prop({ type: Array<mongoose.Schema.Types.ObjectId>, default: [], ref: 'Product' })
  public catalogue: Ref<mongoose.Schema.Types.ObjectId>[]
}

const SellerModel = getModelForClass(Sellers)
mongoose.model('Sellers')
export default SellerModel
