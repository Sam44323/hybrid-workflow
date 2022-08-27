import { prop, getModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'

class Buyers {
  @prop({ required: true, type: String })
  name: string

  @prop({ required: true, type: String })
  email: string
}

const BuyerModel = getModelForClass(Buyers)
mongoose.model('Buyers')
export default BuyerModel
