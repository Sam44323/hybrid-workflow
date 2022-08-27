import { Request, Response } from 'express'
import SellerModel from '../models/sellers.model'
import OrdersModel from '../models/orders.model'
import { ObjectId } from 'mongodb'

const getSellersList = async (req: Request, res: Response) => {
  try {
    const sellers = await SellerModel.find()
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

const getSellerCatalogue = async (req: Request, res: Response) => {}

const createOrder = async (req: Request, res: Response) => {}

export { getSellersList, getSellerCatalogue, createOrder }
