import express from 'express'
import { verifyToken } from '../middleware/verifyToken'
import {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/bookController'
const router = express.Router()

router.get('/', getAllBooks)
router.get('/admin', verifyToken, getAllBooks) // Admin route to get all books with authentication
router.get('/:id', getBook)
router.post('/', verifyToken, createBook)
router.patch('/:id', verifyToken, updateBook)
router.delete('/:id', verifyToken, deleteBook)

export default router