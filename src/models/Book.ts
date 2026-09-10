// Lina jobbar här :)

import mongoose from 'mongoose';
const { Schema } = mongoose;
import genresData from '../data/genres.json';

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: { 
        type: String
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
        type: String
    },
    published_year: {
        type: Number
    }
})

export default mongoose.model('books', BookSchema)