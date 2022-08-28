const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    meta_description: {
        type: String,
        required: true,
    },
    keyword: {
        type: String,
        required: true,
    },
    page_name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['latest', 'others'],
        default: 'latest'
    }
}, {
    timestamps: true,
    versionKey: false,
})

const PageDataModel = mongoose.model('PageData', dataSchema)

module.exports = PageDataModel