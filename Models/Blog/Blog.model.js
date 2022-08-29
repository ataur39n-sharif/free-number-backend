const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    others: {
        type: Object,
        default: {}
    },
    blog_page_name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


const BlogModel = mongoose.model('blog', dataSchema)

module.exports = BlogModel