const NumberController = require('../../Controllers/Numbers/Numbers.controller')

const NumberRoute = require('express').Router()

NumberRoute
    .get('/sync', NumberController.syncNumberList)
    .get('/list', NumberController.allNumberList)
    .put('/status/:number', NumberController.statusUpdate)
    .get('/:id', NumberController.singleNumber)


module.exports = NumberRoute