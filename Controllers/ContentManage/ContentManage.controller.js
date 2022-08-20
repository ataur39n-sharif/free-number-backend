const HomePageModel = require("../../Models/HomePage/HomePage.model")
const IndexPageModel = require("../../Models/IndexPage/IndexPage.model")
const NumberPageModel = require("../../Models/NumberPage/NumberPage.model")

const ContentManage = {
    allPageData: async (req, res) => {
        try {
            const homepage = await HomePageModel.findOne({ status: "latest" })
            const indexPage = await IndexPageModel.findOne({ status: "latest" })
            const numberPage = await NumberPageModel.find({ status: 'latest' })
            return res.status(200).json({
                success: true,
                pageData: {
                    homepage, indexPage, numberPage
                }
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

module.exports = ContentManage