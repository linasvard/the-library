import express from 'express'
import { verifyToken } from '../middleware/verifyToken'
import { fetchAllUsers, fetchUserById, updateUser, deleteUser } from '../controllers/userController'
const router = express.Router()

router.get('/', verifyToken, fetchAllUsers)
router.get('/:id', verifyToken, fetchUserById)
router.patch('/:id', verifyToken, updateUser)
router.delete('/:id', verifyToken, deleteUser)

export default router