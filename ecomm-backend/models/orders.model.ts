import { prop, getModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'

class Order {
  @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  buyer_id: mongoose.Schema.Types.ObjectId

  @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  seller_id: mongoose.Schema.Types.ObjectId

  @prop({ required: true, type: mongoose.Schema.Types.ObjectId, default: [] })
  product_ids: mongoose.Schema.Types.ObjectId[]

  @prop({ required: true, type: Boolean })
  delivered: boolean
}

const OrdersModel = getModelForClass(Order)
export default OrdersModel
