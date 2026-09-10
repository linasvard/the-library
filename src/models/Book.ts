// Lina jobbar här :)

import mongoose from 'mongoose';
const { Schema } = mongoose;
import genresData from '../data/genres.json';
import { ReviewSchema } from './Review';

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    author: { 
        type: String,
        required: true
    },
    // Create a new field for genres as an array of strings
    genres: {
        type: [String],
        enum: genresData.genres,
        default: []
    },
    image: {
        type: String,
        required: false
    },
    published_year: {
        type: Number,
        required: true
    },
    reviews: [ReviewSchema]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


export default mongoose.model('books', BookSchema)