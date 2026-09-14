import { Request, Response } from 'express';
import Review from '../models/Review.js'
import Book from '../models/Book.js';

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

export const createReview = async (req: Request, res: Response) => {
    const { name, content, rating, book_id } = req.body;

    if (name === undefined || content === undefined || rating === undefined || book_id === undefined) {
        res.status(400).json({ error: 'Name, content, rating and book_id demanded'});
        return;
    }

    if (rating < 1 || rating > 5){
        res.status(400).json({ error: 'Rating must be between 1 and 5' });
        return;
    }

    try {
        const bookExists = await Book.findById(book_id);
        if (!bookExists) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }

        const newReview = await Review.create({ name, content, rating, book_id });
        res.status(201).json({ message: 'Review created', newReview });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
}

export const updateReview = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, content, rating } = req.body;

    if (rating !== undefined && (rating < 1 || rating > 5)) {
        res.status(400).json({ error: 'Rating must be between 1 and 5' });
        return;
    }

    try {
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            res.status(404).json({ error: 'Review not found' });
            return;
        }

        res.json({ message: 'Review updated', review: updatedReview });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
}

export const deleteReview = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
        res.status(404).json({ error: 'Review not found'});
        return;
    }

    res.json({ message: 'Review deleted', review: deletedReview});
    } catch (error:unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
}