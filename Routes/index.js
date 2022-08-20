const router = require('express').Router()
const ContentManage = require('../Controllers/ContentManage/ContentManage.controller')
const HomePageController = require('../Controllers/Homepage/Homepage.controller')
const IndexPageController = require('../Controllers/IndexPage/IndexPage.controller')
const sms = require('../Controllers/ReceiveSms/ReceiveSms.controller')

router
    .get('/all', sms.read)
    .get('/all-sms/:number', sms.allSms)
    .post('/new-sms', sms.new_sms)
    .get('/all-page-data', ContentManage.allPageData)
    .get('/index-data', IndexPageController.findData)
    .post('/create-index-data', IndexPageController.createData)
    .put('/update-index-data', IndexPageController.updateIndexData)
    .get('/homepage-data', HomePageController.findData)
    .post('/create-homepage-data', HomePageController.createData)
    .put('/update-homepage-data', HomePageController.updateData)

module.exports = router