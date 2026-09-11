import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { getAllReviews, getReview, createReview, updateReview, deleteReview } from '../controllers/reviewController.js'

const router = express.Router()



router.get('/', getAllReviews)
router.get('/:id', getReview)
router.post('/', createReview)
router.patch('/:id', verifyToken, updateReview)
router.delete('/:id', verifyToken, deleteReview)

export default router