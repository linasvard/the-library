import express from 'express';
import genresData from '../data/genres.json';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(genresData);
});

export default router;