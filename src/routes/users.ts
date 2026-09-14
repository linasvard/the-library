import express from 'express'
import { verifyToken } from '../middleware/verifyToken'
import { fetchAllUsers, fetchUserById } from '../controllers/userController'
const router = express.Router()

router.get('/', verifyToken, fetchAllUsers)
router.get('/:id', verifyToken, fetchUserById)

export default router