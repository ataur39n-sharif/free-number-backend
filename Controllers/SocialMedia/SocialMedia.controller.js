const SocialMediaModel = require("../../Models/SocialMedia/SocialMedia.model")

const SocialMediaController = {
    createData: async (req, res) => {
        try {
            const { url, text_title, appId, media_name, hashTag, subject, body } = req.body
            await SocialMediaModel.create({ url, text_title, appId, media_name, hashTag, subject, body })
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
            const { url, text_title, appId, media_name, hashTag, subject, body } = req.body
            const data = await SocialMediaModel.findOneAndUpdate({ media_name }, { hashTag, url, text_title, appId, subject, body, media_name })
            return res.status(200).json({
                success: true,
                message: 'Update Success .',
                data
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
            const { media_name } = req.params

            const data = await SocialMediaModel.findOne({ media_name })
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

module.exports = SocialMediaController