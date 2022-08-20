const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    receiver: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey:false,
})

const ReceiveSmsModel = mongoose.model('sms', dataSchema)

module.exports = ReceiveSmsModel