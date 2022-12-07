const axios = require("axios");
const NumberModel = require("../../Models/Number/Number.model");
const countryList = require("../countryList");

const OnlineSimUtils = {
    //get all free number
    syncFreeNumbers: async () => {
        const { data: { numbers } } = await axios.get(`https://onlinesim.io/api/getFreePhoneList?lang=en`)
        const all_number = await NumberModel.find()
        const all_countries = Object.entries(countryList)

        for (let i = 0; i < numbers.length; i++) {
            const { country_text, full_number } = numbers[i];
            const phoneNumber = full_number.split('+')[1]
            const haveAlready = all_number.find(each => each.phone_number === Number(phoneNumber))
            const selected_country = all_countries.find(each => each[1].name === country_text)

            if (!haveAlready) {
                const data = {
                    country_code: selected_country[0],
                    country_name: country_text === 'Britain' ? 'United Kingdom' : selected_country[1].name,
                    country_slug: selected_country[1].slug,
                    phone_number: phoneNumber,
                    provider: 'onlineSim',
                }
                await NumberModel.create(data)
            }
        }

        return {
            update: true
        }
    }
}

module.exports = OnlineSimUtils