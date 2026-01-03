import express from 'express'
import { LoginController } from '../controllers/loginController.js'

export const router = express.Router()

const controller = new LoginController()

router.get('/', (req, res, next) => controller.renderLogin(req, res, next))

router.post('/', (req, res, next) => controller.login(req, res, next))

router.get('/logout', (req, res, next) => controller.logout(req, res, next))