import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import BuyerModel from '../models/buyers.model'
import SellerModel from '../models/sellers.model'

const register = async (req: Request, res: Response) => {
  const { type } = req.body
  if (!type) {
    return res.status(400).json({ message: 'Type is required' })
  } else if (['buyer', 'seller'].indexOf(type) === -1) {
    return res.status(400).json({ message: 'Type is invalid' })
  }
  try {
    let user = null

    if (type === 'buyer') user = await BuyerModel.create(req.body)
    else user = await SellerModel.create(req.body)

    return res.status(201).json({ message: 'User created', user })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const login = async (req: Request, res: Response) => {
  const { type, email, password } = req.body
  if (!type) {
    return res.status(400).json({ message: 'Type is required' })
  } else if (['buyer', 'seller'].indexOf(type) === -1) {
    return res.status(400).json({ message: 'Type is invalid' })
  }
  try {
    let user = null

    if (type === 'buyer') user = await BuyerModel.findOne({ email })
    else user = await SellerModel.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    return res.status(200).json({ message: 'User logged in', token })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export { register, login }
