const ReceiveSmsModel = require("../../Models/ReceiveSms/ReceiveSms.model")

const ReceiveSmsController = {
    new_sms: async (req, res) => {
        try {
            const { receiver, sender, message } = req.body
            await ReceiveSmsModel.create({ receiver, sender, message })
            return res.status(200).json({
                success: true,
                message: "a new message arrived. "
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })

        }
    },
    read: async (req, res) => {
        try {
            const data = await ReceiveSmsModel.find()
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
    allSms: async (req, res) => {
        try {
            const { number } = req.params;
            const msgList = await ReceiveSmsModel.find({ receiver: number }).sort({createdAt:-1})
            return res.status(200).json({
                success: true,
                msgList
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

module.exports = ReceiveSmsController