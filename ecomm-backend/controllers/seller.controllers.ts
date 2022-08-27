import { Request, Response } from 'express'
import ProductModel from '../models/products.model'
import OrdersModel from '../models/orders.model'
import SellerModel from '../models/sellers.model'
import mongoose from 'mongoose'
import { ObjectId, ObjectID } from 'bson'

const createCatalog = async (req: Request, res: Response) => {
  const { sellerId, data } = req.body
  if (!sellerId || data.length === 0) {
    console.log(sellerId)
    console.log(data)
    return res.status(400).json({ message: 'Payload incomplete...' })
  }
  try {
    const seller = await SellerModel.findById(new ObjectID(sellerId))

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
        console.log('Prod: ', prod._id)
      })
    )

    console.log('ProdIds: ', prodIds)

    seller.catalogue = [...seller.catalogue, ...prodIds]

    await SellerModel.findOneAndUpdate({ _id: new ObjectID(sellerId) }, seller)

    return res.status(201).json({ message: 'Catalogue created...' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

const getOrders = async (req: Request, res: Response) => {}

export { createCatalog, getOrders }
