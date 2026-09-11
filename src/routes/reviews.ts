import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { getAllReviews, getReview } from '../controllers/reviewController.js'

const router = express.Router()

// Marcus jobbar här

router.get('/', getAllReviews)
router.get('/:id', getReview)

export default router