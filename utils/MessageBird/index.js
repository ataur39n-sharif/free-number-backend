const { default: axios } = require("axios");
const NumberModel = require("../../Models/Number/Number.model");
const countryList = require("../countryList");

const MessageBirdUtils = {
    //sync numbers
    syncNumbers: async () => {
        const list = await axios.get('https://numbers.messagebird.com/v1/phone-numbers?limit=100', {
            headers: {
                'Authorization': 'AccessKey 5TfrdszTj84jQGS2PtV84BIJy'
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
    }
}

module.exports = MessageBirdUtils