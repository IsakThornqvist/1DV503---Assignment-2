import express from 'express'
import { RegisterController } from '../controllers/registerController.js'

export const router = express.Router()

const controller = new RegisterController()

router.get('/', (req, res, next) => controller.register(req, res, next))

router.post('/', (req, res, next) => controller.registerNewMember(req, res, next))
