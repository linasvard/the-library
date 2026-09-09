import express from 'express'
import { verifyToken } from '../middleware/verifyToken'
import {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/bookController.js'
const router = express.Router()

// Lina jobbar här

export default router

