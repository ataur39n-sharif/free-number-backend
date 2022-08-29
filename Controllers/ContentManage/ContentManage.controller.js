const IndexPageModel = require("../../Models/IndexPage/IndexPage.model")
const NumberPageModel = require("../../Models/NumberPage/NumberPage.model")
const PageDataModel = require("../../Models/PageData/PageData.model")
const SocialMediaModel = require("../../Models/SocialMedia/SocialMedia.model")

const ContentManage = {
    allPageData: async (req, res) => {
        try {
            const indexPage = await IndexPageModel.findOne({ status: "latest" })
            const numberPage = await NumberPageModel.findOne({ status: 'latest' })
            const socialMedia = await SocialMediaModel.find()
            const allPagesData = await PageDataModel.find()
            return res.status(200).json({
                success: true,
                pageData: {
                    indexPage, numberPage, socialMedia, allPagesData
                }
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    findOnePage: async (req, res) => {
        try {
            const { page_name } = req.params
            const pageInfo = await PageDataModel.findOne({ page_name })

            return res.status(200).json({
                success: true,
                data: pageInfo
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    newPageInfo: async (req, res) => {
        try {
            const { title, meta_description, page_name, keyword } = req.body
            const previous = await PageDataModel.findOne({ page_name })
            if (!previous) {
                await PageDataModel.create({ title, meta_description, page_name, keyword })

                return res.status(200).json({
                    success: true,
                    message: 'Successfully created .'
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Already has a page .'
                })
            }


        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    updatePageInfo: async (req, res) => {
        try {
            const { page_name } = req.params
            const { title, meta_description, keyword } = req.body

            const validReq = await PageDataModel.findOne({ page_name })
            if (!validReq) {
                return res.status(404).json({
                    success: false,
                    message: 'No page found .'
                })
            }

            await PageDataModel.findOneAndUpdate({ page_name }, { title, meta_description, keyword })

            return res.status(200).json({
                success: true,
                message: 'Successfully updated .'
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