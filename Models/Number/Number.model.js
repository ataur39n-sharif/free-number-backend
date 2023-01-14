const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    phone_number: {
        type: Number,
        required: true,
    },
    country_name: {
        type: String,
        required: true,
    },
    country_slug: {
        type: String,
        required: true,
    },
    country_code: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "active",
        required: true
    },
    provider: {
        type: String,
        enum: ['messageBird', 'onlineSim','telnyx','vonage'],
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const NumberModel = mongoose.model('number', dataSchema)

module.exports = NumberModel