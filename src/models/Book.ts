// Lina jobbar här :)

import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookSchema = new Schema({
    // model/schema här
})

export default mongoose.model('books', BookSchema)