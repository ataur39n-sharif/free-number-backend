const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    page_title: {
        type: String,
        required: true,
    },
    meta_description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['latest', 'others'],
        default: 'others'
    }
}, {
    timestamps: true,
    versionKey: false
})

const HomePageModel = mongoose.model('homepageData', dataSchema)

module.exports = HomePageModel