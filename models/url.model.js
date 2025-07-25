const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    shortURL: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [
        {
            timeStamp: {type : Number}
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps: true});

const URL = mongoose.model('url', urlSchema);

module.exports = URL;

