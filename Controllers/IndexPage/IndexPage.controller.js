const IndexPageModel = require("../../Models/IndexPage/IndexPage.model")

const IndexPageController = {
    createData: async (req, res) => {
        try {
            const { website_title, meta_description, keywords } = req.body
            await IndexPageModel.create({ website_title, meta_description, keywords, status: "latest" })
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
            const data = await IndexPageModel.findOne({ status: "latest" })
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
    updateIndexData: async (req, res) => {
        try {
            const { website_title, meta_description, keywords } = req.body
            await IndexPageModel.findOneAndUpdate({ status: 'latest' }, { website_title, meta_description, keywords })
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

module.exports = IndexPageController