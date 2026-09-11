import { Request, Response } from 'express';
import Review from '../models/Review.js'

export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
}

export const getReview = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const review = await Review.findById(id);
    if (!review) {
        res.status(404).json({ error: 'Review not found' });
        return;
        }
        res.json(review);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
}