import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { getAllReviews, getReview, createReview, updateReview } from '../controllers/reviewController.js'

const router = express.Router()

// Marcus jobbar här

router.get('/', getAllReviews)
router.get('/:id', getReview)
router.post('/', createReview)
router.patch('/:id', verifyToken, updateReview)

export default router