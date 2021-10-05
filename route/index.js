const express=require("express")
const router=express.Router()

router.use('/',require('./allfileRoute'))



module.exports=router