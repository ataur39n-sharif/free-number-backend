const { default: axios } = require("axios");
const { phone } = require('phone');
const NumberModel = require("../../Models/Number/Number.model");
const countryList = require("../countryList");


const TelnyxUtils = {
    //sync numbers
    syncNumbers: async () => {
        const { data } = await axios.get(`https://api.telnyx.com/v2/phone_numbers`, {
            headers: {
                'Authorization': 'Bearer KEY018338BD2B10B23AADC63CEE126A3AD7_xsA0DbcnSjcInYhdpm0X3p'
            }
        })
        const all_numbers = await NumberModel.find()
        const all_countries = Object.entries(countryList)

        for (let i = 0; i < data.data.length; i++) {
            const element = data.data[i];
            const phoneNumber = element?.phone_number.split('+')[1]
            const { countryIso2 } = phone(element?.phone_number)

            const haveAlready = all_numbers.find(each => each.phone_number === Number(phoneNumber))
            const selected_country = all_countries.find(each => each[0] === countryIso2.toLowerCase())

            // console.log(phoneNumber, countryIso2, haveAlready, selected_country);
            const modifyObj = {
                country_code: countryIso2.toLowerCase(),
                country_name: selected_country[1].name,
                country_slug: selected_country[1].slug,
                phone_number: phoneNumber,
                provider: 'telnyx',
            }

            if (!haveAlready) {
                await NumberModel.create(modifyObj)
            }
        }
    }
}

module.exports = TelnyxUtils