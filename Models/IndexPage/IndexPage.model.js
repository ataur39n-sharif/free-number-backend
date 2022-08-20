const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    website_title: {
        type: String,
        required: true,
    },
    meta_description: {
        type: String,
        required: true,
    },
    keywords: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['latest', 'others'],
        default: 'others'
    }
}, {
    timestamps: true,
    versionKey:false,
})

const IndexPageModel = mongoose.model('indexPage', dataSchema)

module.exports = IndexPageModel