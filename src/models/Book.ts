// Lina jobbar här :)

import mongoose from 'mongoose';
const { Schema } = mongoose;

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
        default: [],
        required: true
    },
    image: {
        type: String
    },
    published_year: {
        type: Number
    }
})

export default mongoose.model('books', BookSchema)