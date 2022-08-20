const HomePageModel = require("../../Models/HomePage/HomePage.model")

const HomePageController = {
    createData: async (req, res) => {
        try {
            const { page_title, meta_description } = req.body
            await HomePageModel.create({ page_title, meta_description, status: 'latest' })
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
    updateData: async (req, res) => {
        try {
            const { page_title, meta_description } = req.body
            await HomePageModel.findOneAndUpdate({ status: 'latest' }, { page_title, meta_description })
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
    },
    findData: async (req, res) => {
        try {
            const data = await HomePageModel.findOne({ status: 'latest' })
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
}

module.exports = HomePageController