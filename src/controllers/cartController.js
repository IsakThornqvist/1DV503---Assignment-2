import { CartModel } from "../models/cartModel.js"

export class CartController {
    #cartModel


    constructor() {
        this.#cartModel = new CartModel()
    }
}