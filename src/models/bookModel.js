const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required',
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: 'Excerpt is required',
        trim: true
    },
    bookCover: { type: String },
    userId: {
        type: ObjectId,
        ref: "bookManagementPrtoject_user",
        required: "User Id is required",
        trim: true
    },
    ISBN: {
        type: String,
        required: 'ISBN is required',
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: 'Category is required',
        trim: true
    },
    subcategory: {
        type: [String],
        required: 'Subcategory is required'
    },
    reviews: {
        type: Number,
        default: 0,
        trim: true
    },
    deletedAt: { type: Date },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: { type: Date, required: true },

}, { timestamps: true });

module.exports = mongoose.model('bookManagementProject_book', bookSchema);