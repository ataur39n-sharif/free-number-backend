const NumberPageModel = require("../../Models/NumberPage/NumberPage.model")

const NumberPageController = {
    createData: async (req, res) => {
        try {
            const { page_title, meta_description, blog_title, blog_description } = req.body
            await NumberPageModel.create({ page_title, meta_description, blog_title, blog_description, status: "latest" })
            return res.status(200).json({
                success: true,
                message: 'Created Success .'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    findData: async (req, res) => {
        try {
            const data = await NumberPageModel.findOne({ status: "latest" })
            return res.status(200).json({
                success: true,
                data
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    updateNumberPageData: async (req, res) => {
        try {
            const {page_title, meta_description, blog_title, blog_description } = req.body
            await NumberPageModel.findOneAndUpdate({ status: 'latest' }, { page_title, meta_description, blog_title, blog_description })
            return res.status(200).json({
                success: true,
                message: 'Update Success .'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}
module.exports = NumberPageController