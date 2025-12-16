import express from 'express'
import { BookController } from '../controllers/bookController.js'

export const router = express.Router()
const controller = new BookController()

router.get('/', (req, res, next) => controller.renderBooks(req, res, next))
