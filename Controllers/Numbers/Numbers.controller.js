const { default: axios } = require("axios")
const NumberModel = require("../../Models/Number/Number.model")
const countryList = require("../../utils/countryList")

const NumberController = {
    //add number
    syncNumberList: async (req, res) => {
        try {
            const list = await axios.get('https://numbers.messagebird.com/v1/phone-numbers?limit=100', {
                headers: {
                    'Authorization': 'AccessKey XM7Qv4P6xzebLjyNueNHahiu0'
                }
            })
            const allNumber = await NumberModel.find()
            const countryInfoList = Object.entries(countryList)

            const messageBirdNumberList = allNumber.filter((doc) => (doc.provider === "messageBird") && (doc.status === 'active'))

            //update inactive number list
            messageBirdNumberList?.map(async (eachData) => {
                const available = list?.data?.items?.find((singleData) => parseInt(singleData.number) === eachData.phone_number)
                if (!available) {
                    await NumberModel.updateOne({ phone_number: eachData.phone_number }, { status: 'inactive' })
                }
            })

            //add new number from messageBird to db
            list.data?.items.map(async (eachData) => {
                const listed = allNumber.find((a) => a.phone_number === parseInt(eachData.number))
                if (!listed) {
                    const currentCountryInfo = countryInfoList.find((each) => each[0] === eachData.country.toLowerCase())
                    await NumberModel.create({
                        phone_number: eachData.number,
                        country_code: eachData.country.toLowerCase(),
                        country_name: currentCountryInfo[1].name,
                        status: 'active',
                        provider: "messageBird",
                        country_slug: currentCountryInfo[1].slug
                    })
                }
            })


            return res.status(200).json({
                success: true,
                message: 'Sync Completed. '
            })
        } catch (error) {
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