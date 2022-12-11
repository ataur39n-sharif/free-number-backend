
const { default: axios } = require("axios")
const NumberModel = require("../../Models/Number/Number.model")
const countryList = require("../../utils/countryList")
const MessageBirdUtils = require("../../utils/MessageBird")
const OnlineSimUtils = require("../../utils/OnlineSim")
const TelnyxUtils = require("../../utils/Telnyx")

const NumberController = {
    //add number
    syncNumberList: async (req, res) => {
        try {
            await MessageBirdUtils.syncNumbers()
            await OnlineSimUtils.syncFreeNumbers()
            await TelnyxUtils.syncNumbers()

            return res.status(200).json({
                success: true,
                message: 'Sync Completed. '
            })
        } catch (error) {
            console.log('error', error);
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    //status update
    statusUpdate: async (req, res) => {
        try {
            const { number } = req.params;
            const { status } = req.body
            await NumberModel.findOneAndUpdate({ phone_number: number }, { status: status }, { runValidators: true })

            return res.status(200).json({
                success: true,
                message: "Successfully updated ."
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    //find number
    allNumberList: async (req, res) => {
        try {
            const list = await NumberModel.find()

            return res.status(200).json({
                success: true,
                list
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },
    //single number
    singleNumber: async (req, res) => {
        try {
            const { id } = req.params
            const result = await NumberModel.findOne({ phone_number: id })
            return res.status(200).json({
                success: true,
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

module.exports = NumberController