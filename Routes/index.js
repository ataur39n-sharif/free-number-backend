const router = require('express').Router()
const ContentManage = require('../Controllers/ContentManage/ContentManage.controller')
const HomePageController = require('../Controllers/Homepage/Homepage.controller')
const IndexPageController = require('../Controllers/IndexPage/IndexPage.controller')
const NumberPageController = require('../Controllers/NumberPage/NumberPage.controller')
const sms = require('../Controllers/ReceiveSms/ReceiveSms.controller')
const SocialMediaController = require('../Controllers/SocialMedia/SocialMedia.controller')

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
    .get('/number-page-data',NumberPageController.findData)
    .post('/create-number-page-data',NumberPageController.createData)
    .put('/update-number-page-data',NumberPageController.updateNumberPageData)
    .get('/social-media/:media_name',SocialMediaController.findData)
    .post('/new-social-media',SocialMediaController.createData)
    .put('/update-social-media',SocialMediaController.updateData)

module.exports = router