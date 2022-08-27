import { Request, Response } from 'express'
import ProductModel from '../models/products.model'
import OrdersModel from '../models/orders.model'
import SellerModel from '../models/sellers.model'
import { ObjectId } from 'mongodb'

const createCatalog = async (req: Request, res: Response) => {
  const { sellerId, data } = req.body
  if (!sellerId || data.length === 0) {
    return res.status(400).json({ message: 'Payload incomplete...' })
  }
  try {
    const seller = await SellerModel.findById(new ObjectId(sellerId))

    if (!seller) {
      return res.status(400).json({ message: 'Seller not found' })
    }
    const prodIds = []

    await Promise.all(
      data.map(async (product: { name: string; price: number }) => {
        const existingProduct = await ProductModel.find({ name: product.name })
        if (existingProduct.length > 0) {
          return
        }
        const prod = await ProductModel.create(product)
        prodIds.push(prod._id)
      })
    )

    seller.catalogue = [...seller.catalogue, ...prodIds]

    await SellerModel.findOneAndUpdate({ _id: new ObjectId(sellerId) }, seller)

    return res.status(201).json({ message: 'Catalogue created...' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

const getOrders = async (req: Request, res: Response) => {
  const { sellerId } = req.body

  if (!sellerId) {
    return res.status(400).json({ message: 'Payload incomplete...' })
  }
  try {
    const orders = await OrdersModel.find({
      seller: new ObjectId(sellerId.toString())
    })
    return res.status(200).json({ orders })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

export { createCatalog, getOrders }
