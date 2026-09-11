

import mongoose from 'mongoose';
const { Schema } = mongoose;

export const ReviewSchema = new Schema({
    // model/schema här
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    book_id: {
        type: Schema.Types.ObjectId,
        ref: 'books',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})

export default mongoose.model('reviews', ReviewSchema)