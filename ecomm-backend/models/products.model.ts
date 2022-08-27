import { prop, getModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'

class Product {
  @prop({ required: true, type: String })
  name: string

  @prop({ required: true, type: Number })
  price: number
}

const ProductModel = getModelForClass(Product)
mongoose.model('Product')
export default ProductModel
