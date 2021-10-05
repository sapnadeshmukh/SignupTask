const express = require('express')
const router = express.Router()
const allfileController = require('../controller/allfile')




router.post('/uploadfile',allfileController.fileUpload.single('file'), allfileController.allfile)




module.exports = router