import express from 'express'
import { CartController } from '../controllers/cartController.js'

export const router = express.Router()
const controller = new CartController()

router.get('/', (req, res, next) => controller.renderCart(req, res, next)
)

router.post('/clear', (req, res, next) => controller.clearCart(req, res, next)
)

router.post('/add', (req, res, next) => controller.addToCart(req, res, next)
)
router.post('/checkout', (req, res, next) => controller.checkout(req, res, next))


