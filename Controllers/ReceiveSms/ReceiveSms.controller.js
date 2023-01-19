const NumberModel = require("../../Models/Number/Number.model")
const ReceiveSmsModel = require("../../Models/ReceiveSms/ReceiveSms.model")
const OnlineSimUtils = require("../../utils/OnlineSim")

const ReceiveSmsController = {
    new_sms: async (req, res) => {
        try {
            const { receiver, sender, message } = req.body
            const { provider } = req.query
            console.log('provider', provider);

            if (provider === 'telnyx') {
                const { data: { payload } } = req.body
                const { from, to, text } = payload
                await ReceiveSmsModel.create({
                    receiver: to[0].phone_number.split('+')[1],
                    sender: from.phone_number.split('+')[1],
                    message: text
                })
            } else if (provider === 'vonage') {
                const { msisdn, to, text } = req.body
                console.log(req.body);
                await ReceiveSmsModel.create({
                    receiver: to,
                    sender: msisdn,
                    message: text,
                    provider: 'vonage'
                })
            } else {
                await ReceiveSmsModel.create({ receiver, sender, message })
            }

            return res.status(200).json({
                success: true,
                message: "a new message arrived. "
            })
        } catch (error) {
            console.log(error);
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
            const numberInfo = await NumberModel.findOne({ phone_number: number })
            // console.log(numberInfo);
            let msgList = []
            if (numberInfo.provider === 'onlineSim') {
                console.log('hi');
                const msg = await OnlineSimUtils.getAllMessages(`+${number}`, numberInfo?.country_code)
                // console.log('msg', msg);
                msgList = msg
            } else {
                const msg = await ReceiveSmsModel.find({ receiver: number }).sort({ createdAt: -1 })
                msgList = msg
            }
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