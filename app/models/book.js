import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        index: true,
    },
    author: {
        type: String,
        trim: true,
        required: true,
        index: true,
    },
    genre: {
        type: String,
        trim: true,
        required: true,
        index: true,
    },
    year: Number,
    pages: Number,
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
});

bookSchema.statics = {
    get(id) {
        return this.findByIdAsync(id);
    },
    list({
        skip = 0,
        limit = 50,
    } = {}) {
        return this.find()
            .skip(skip)
            .limit(limit)
            .execAsync();
    },
};

export default mongoose.model('Book', bookSchema);
