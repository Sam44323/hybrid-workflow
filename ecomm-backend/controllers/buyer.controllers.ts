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

const createOrder = async (req: Request, res: Response) => {}

export { getSellersList, getSellerCatalogue, createOrder }
