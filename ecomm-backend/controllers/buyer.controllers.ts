import { Request, Response } from 'express'
import SellerModel from '../models/sellers.model'
import OrdersModel from '../models/orders.model'

const getSellersList = async (req: Request, res: Response) => {}

const getSellerCatalogue = async (req: Request, res: Response) => {}

const createOrder = async (req: Request, res: Response) => {}

export { getSellersList, getSellerCatalogue, createOrder }
