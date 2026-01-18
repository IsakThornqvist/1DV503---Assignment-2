import { CartModel } from '../models/cartModel.js'
import { OrderModel } from '../models/orderModel.js'
import { MemberModel } from '../models/memberModel.js'

export class CartController {
  #cartModel
  #orderModel
  #memberModel

  constructor() {
    this.#cartModel = new CartModel()
    this.#orderModel = new OrderModel()
    this.#memberModel = new MemberModel()
  }

  async renderCart(req, res, next) {
    try {
        // Check if use ris logged in
      if (!req.session.user) {
        return res.redirect('/login')
      }

      const userid = req.session.user.id
      const allCartItems = await this.#cartModel.getCartItemsWithUserId(userid)

    // Calculate total cart amount
    let cartTotalAmount = 0
    for (let i = 0; i < allCartItems.length; i++) {
        cartTotalAmount += Number(allCartItems[i].total)
    }

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

      // 1 quantity is default
      await this.#cartModel.addBookToCart(userid, isbn, Number(qty) || 1)

      res.redirect('/cart')
    } catch (err) {
      next(err)
    }
  }


async checkout(req, res, next) {
  try {
    const userid = req.session.user.id

    const allCartItems = await this.#cartModel.getCartItemsWithUserId(userid)
    const userAddress = await this.#memberModel.getUserAddress(userid)

    // Create a new order
    const ono = await this.#orderModel.createOrder(
      userid,
      userAddress.address,
      userAddress.city,
      userAddress.zip
    )

    // Add items to order details (odetails table)
    for (let i = 0; i < allCartItems.length; i++) {
        await this.#orderModel.createOrderDetail(
            ono, 
            allCartItems[i].isbn, 
            allCartItems[i].qty, 
            allCartItems[i].total
        )
    }

    await this.#cartModel.clearCart(userid)

    // Set delivery date 1 week from order day
    const deliveryDate = new Date()
    const orderDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 7)

    // Calculate the total price
    let totalPrice = 0
    for (const item of allCartItems) {
        totalPrice += Number(item.total)
    }

    res.render('cart/orderDetails', {
      ono,
      allCartItems,
      userAddress,
      deliveryDate: deliveryDate.toLocaleDateString(),
      orderDate: orderDate.toLocaleDateString(),
      totalPrice
    })
  } catch (err) {
    next(err)
  }
}
}
