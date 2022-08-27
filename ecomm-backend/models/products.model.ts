import { prop, getModelForClass } from '@typegoose/typegoose'

class Product {
  @prop({ required: true, type: String })
  name: string

  @prop({ required: true, type: Number })
  price: number
}

const ProductModel = getModelForClass(Product)
export default ProductModel
