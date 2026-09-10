// Marcus jobbar här :)

import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'books',
        required: true
    }

})

export default mongoose.model('reviews', ReviewSchema)