const {genreSchema} = require('./genre');
const Joi = require('joi');
const mongoose = require('mongoose');

const Movies = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        maxlength:225
    },
    genre: genreSchema,
    numberInStock: Number,
    dailyRentalRate: Number
}));

