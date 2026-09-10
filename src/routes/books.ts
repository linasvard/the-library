import express from 'express'
import { verifyToken } from '../middleware/verifyToken'
import {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/bookController.js'
const router = express.Router()

router.get('api/books', getAllBooks)
router.get('api/books/:id', getBook)


// Lina jobbar här

export default router

