import { CartModel } from '../models/cartModel.js'
import { OrderModel } from '../models/orderModel.js'
import { MemberModel } from '../models/memberModel.js'

export class CartController {
  #cartModel


  constructor() {
    this.#cartModel = new CartModel()

  }

  async renderCart(req, res, next) {
    try {
      if (!req.session.user) {
        return res.redirect('/login')
      }

      const userid = req.session.user.id
      const allCartItems = await this.#cartModel.getCartItemsWithUserId(userid)

      const cartTotalAmount = allCartItems.reduce(
        (sum, item) => sum + Number(item.total),
        0
      )

      res.render('cart/cart', {
        title: 'Your Cart',
        allCartItems,
        cartTotalAmount
      })
    } catch (err) {
      next(err)
    }
  }

  async clearCart(req, res, next) {
    try {
      if (!req.session.user) {
        return res.redirect('/login')
      }

      const userid = req.session.user.id
      await this.#cartModel.clearCart(userid)

      res.redirect('/cart')
    } catch (err) {
      next(err)
    }
  }

  async addToCart(req, res, next) {
    try {
      if (!req.session.user) {
        return res.redirect('/login')
      }

      const userid = req.session.user.id
      const { isbn, qty } = req.body

      await this.#cartModel.addBookToCart(userid, isbn, Number(qty) || 1)

      res.redirect('/cart')
    } catch (err) {
      next(err)
    }
  }



}
