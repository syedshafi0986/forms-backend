import express from 'express'
const router = express.Router()
// import { requireAuth } from '../middleware/requireAuth.js'
// const app = express()
import { register,login } from '../controllers/userController.js'
// app.use(requireAuth)
router.post("/register",register)
router.post("/login",login)


export {router};