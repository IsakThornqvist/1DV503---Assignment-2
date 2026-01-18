import express from 'express'
import { CartController } from '../controllers/cartController.js'

export const router = express.Router()
const controller = new CartController()

router.get()