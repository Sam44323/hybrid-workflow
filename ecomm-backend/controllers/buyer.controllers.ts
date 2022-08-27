import { Request, Response } from 'express'
import Seller from '../models/sellers.model'
import OrdersModel from '../models/orders.model'
import { ObjectId } from 'mongodb'

const getSellersList = async (req: Request, res: Response) => {
  try {
    const sellers = await Seller.find()
    if (!sellers) {
      return res.status(404).json({
        message: 'Sellers not found'
      })
    }
    return res.status(200).json({ sellers })
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}

const getSellerCatalogue = async (req: Request, res: Response) => {
  const { seller_id } = req.params
  if (!seller_id) {
    return res.status(400).json({ message: 'Missing seller id' })
  }
  try {
    let seller = await Seller.findById(seller_id)
    console.log(seller)
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' })
    }

    seller = await (
      await Seller.findById(new ObjectId(seller_id))
    ).populate('catalogue')
    console.log('seller: ', seller)
    return res.status(200).json({ seller })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const createOrder = async (req: Request, res: Response) => {
  const { seller_id } = req.params
  const { product_ids, buyer } = req.body
  if (!seller_id || !product_ids || product_ids.length === 0 || !buyer) {
    return res.status(400).json({ message: 'Missing payload...' })
  }
  try {
    const seller = await Seller.findById(new ObjectId(seller_id))
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' })
    }
    let products = product_ids.map((id: string) => new ObjectId(id))
    console.log('Product ids: ', products)
    const order = new OrdersModel({
      seller_id: seller._id,
      product_ids: [...products],
      buyer_id: buyer,
      delivered: false
    })
    await order.save()
    console.log('Order: ', order)
    return res.status(200).json({ order })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

export { getSellersList, getSellerCatalogue, createOrder }
