const { Vonage } = require('@vonage/server-sdk');
const NumberModel = require('../../Models/Number/Number.model');
const countryList = require("../countryList");


const vonage = new Vonage(
    {
        apiKey: '892d965f',
        apiSecret: '892d965ftrSd'
    },
    {
        debug: true
    }
)

const VonageUtils = {
    syncNumbers: async (all_numbers) => {
        try {
            const all_countries = Object.entries(countryList)

            const { numbers, count } = await vonage.numbers.getOwnedNumbers({ size: 100 })
            // console.log(count, numbers);

            const previousList = all_numbers.filter(each => each.provider === 'vonage')
            let newList = []


            for (let i = 0; i < numbers.length; i++) {
                const element = numbers[i];
                const alreadyAdded = previousList.find(each => each.phone_number === Number(element.msisdn))
                const selected_country = all_countries.find(each => each[0] === element.country.toLowerCase())
                
                if (!alreadyAdded) {
                    const data = {
                        country_code: selected_country[0] === 'gb' ? 'uk' : selected_country[0],
                        country_name: selected_country[1].name,
                        country_slug: selected_country[1].slug,
                        phone_number: Number(element.msisdn),
                        provider: 'vonage',
                    }
                    newList.push(data)
                }
            }

            if (newList.length) {
                await NumberModel.insertMany(newList)
            }

            // return res.status(200).json({
            //     numbers
            // })
        } catch (error) {
            console.log(error)
            // return res.status(500).json({
            //     success: false
            // })
        }
    }
}

module.exports = VonageUtils