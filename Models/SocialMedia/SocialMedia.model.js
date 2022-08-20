const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    url: {
        type: String,
        require: true,
    },
    text_title: {
        type: String,
        require: true
    },
    hashTag: {
        type: String,
    },
    appId: {
        type: String,
    },
    media_name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
    },
    body: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false,
})

const SocialMediaModel = mongoose.model('SocialMedia', dataSchema)

module.exports = SocialMediaModel