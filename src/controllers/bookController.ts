import { Request, Response } from 'express';
import Books from '../models/Book.js'

export const getBooks = async (req: Request, res: Response) => {
    const search = req.query.search as string | undefined;
    const sort = req.query.sort as string | undefined;

    try {
        const filter: any = {};
        if (search) {
            filter.title = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        let query = Books.find(filter);
        if (sort === 'asc') {
            query = query.sort({ title: 1 });
        } else if (sort === 'desc') {
            query = query.sort({ title: -1 });
        }
        const books = await query.exec();
        res.json(books);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }

};

export const getBookById = async (req: Request, res: Response) => {

}

export const createBook = async (req: Request, res: Response) => {
    const { title, description, author, genres, image, published_year } = req.body;
    if (title === undefined || description === undefined || author === undefined || genres === undefined || image === undefined || published_year === undefined) {
        res.status(400).json({ error: 'title, description, author, genres, image, and published_year are required' });
        return;
    }

    try {
        const newBook = new Books({
            title,
            description,
            author,
            genres,
            image,
            published_year
        });
        const savedBook = await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: savedBook });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }

}

export const updateBook = async (req: Request, res: Response) => {

}

export const deleteBook = async (req: Request, res: Response) => {

}