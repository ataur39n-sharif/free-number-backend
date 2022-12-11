const router = require('express').Router()
const BlogController = require('../Controllers/Blog/Blog.controller')
const ContentManage = require('../Controllers/ContentManage/ContentManage.controller')
// const HomePageController = require('../Controllers/Homepage/Homepage.controller')
const IndexPageController = require('../Controllers/IndexPage/IndexPage.controller')
const NumberPageController = require('../Controllers/NumberPage/NumberPage.controller')
const sms = require('../Controllers/ReceiveSms/ReceiveSms.controller')
const SocialMediaController = require('../Controllers/SocialMedia/SocialMedia.controller')
const NumberRoute = require('./NumbersRoute')

router
    .get('/all', sms.read)
    .get('/all-sms/:number', sms.allSms)
    .post('/new-sms', sms.new_sms)
    .get('/all-page-data', ContentManage.allPageData)
    .get('/index-data', IndexPageController.findData)
    .post('/create-index-data', IndexPageController.createData)
    .put('/update-index-data', IndexPageController.updateIndexData)
    // .get('/homepage-data', HomePageController.findData)
    // .post('/create-homepage-data', HomePageController.createData)
    // .put('/update-homepage-data', HomePageController.updateData)
    .get('/number-page-data', NumberPageController.findData)
    .post('/create-number-page-data', NumberPageController.createData)
    .put('/update-number-page-data', NumberPageController.updateNumberPageData)
    .get('/all-social-media', SocialMediaController.allData)
    .get('/social-media/:media_name', SocialMediaController.findData)
    .post('/new-social-media', SocialMediaController.createData)
    .put('/update-social-media', SocialMediaController.updateData)
    .get('/page/:page_name', ContentManage.findOnePage)
    .post('/new-page-info', ContentManage.newPageInfo)
    .put('/page/:page_name', ContentManage.updatePageInfo)
    .get('/blog', BlogController.getAllBlog)
    .get('/blog/:id', BlogController.getSingleBlog)
    .post('/blog/create', BlogController.addNewBlog)
    .put('/blog/:id', BlogController.editBlog)
    .delete('/blog/:id', BlogController.deleteBlog)
    .use('/number', NumberRoute)
    .post('/test', (req, res) => {
        console.log(req.query);
        console.log(req.body);
        return res.status(200).end()
    })


module.exports = router