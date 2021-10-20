require('dotenv').config()
const express=require('express')
const app=express()
app.use(express.json())


app.use('',require('./route/allfileRoute'))
const PORT=process.env.PORT;


app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})




