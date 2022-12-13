const { default: axios } = require("axios");
const NumberModel = require("../../Models/Number/Number.model");
const CountryCodes = require("../CountryCodes");
const countryList = require("../countryList");

const OnlineSimUtils = {
    //get all free number
    syncFreeNumbers: async () => {

        //get free number list form onlineSim api
        const { data: { numbers } } = await axios.get(`https://onlinesim.io/api/getFreePhoneList?lang=en`)
        // all numberList form database 
        const all_number = await NumberModel.find({ provider: "onlineSim" })
        //all country list
        const all_countries = Object.entries(countryList)

        let oldNumberList = []
        let newNumberList = []

        //make a array of old numbers
        all_number.map(oldNum => {
            const listed = oldNumberList.find(each => each === Number(oldNum.phone_number))
            if (!listed) {
                oldNumberList.push(oldNum.phone_number)
            }
        })

        //check all numbers from online sim api already listed or not in database. If not listed then add to database.
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

                const listed = oldNumberList.find(each => each === Number(phoneNumber))
                if (!listed) {
                    oldNumberList.push(Number(phoneNumber))
                }
            }
            //if this number not included in old number list add to new number list 
            if (!oldNumberList.includes(phoneNumber)) {
                newNumberList.push(Number(phoneNumber))
            }
        }

        // await NumberModel.updateMany({ provider: 'onlineSim' }, { status: 'active' })
        console.log(oldNumberList.length, newNumberList.length);

        // console.log(oldNumberList, newNumberList);

        for (let i = 0; i < oldNumberList.length; i++) {
            const num = oldNumberList[i];
            // console.log(i, newNumberList.includes(num), num);
            // console.log(i, oldNumberList.includes(num), num);
            if (!newNumberList.includes(num)) {
                await NumberModel.findOneAndUpdate({ phone_number: num }, { status: 'inactive' })
            }
        }
        return {
            update: true
        }
    },
    //get all messages for a number
    getAllMessages: async (number, country_code) => {

        // console.log(number, country_code);

        const calling_code = CountryCodes.find(each => each.code.toLowerCase() === country_code?.toLowerCase())
        const dial_digit = calling_code.dial_code.split('+')[1]
        const number_withOut_dialDigit = number.split(calling_code.dial_code)[1]
        const response = await axios.get(`https://onlinesim.io/api/getFreeMessageList?phone=${number_withOut_dialDigit}&country=${dial_digit}&lang=en`)


        const { data, last_page } = response?.data?.messages
        let msgList = [...data]

        if (last_page > 10) {
            for (let i = 2; i <= 3; i++) {
                const newPageData = await axios.get(`https://onlinesim.io/api/getFreeMessageList?phone=${number_withOut_dialDigit}&country=${dial_digit}&lang=en&page=${i}`)
                msgList = [...msgList, ...newPageData?.data?.messages?.data]
            }
        }

        let allMessages = []
        for (let i = 0; i < msgList.length; i++) {
            const { text, in_number, my_number, created_at, data_humans } = msgList[i];
            const modifyObj = {
                receiver: number,
                sender: in_number,
                message: text,
                createdAt: created_at,
                data_humans
            }
            allMessages.push(modifyObj)
        }
        return allMessages
    }
}

module.exports = OnlineSimUtils