const express = require('express');
const connection=require('../database/connection')
const bcrypt=require('bcrypt')
const multer = require('multer');
const path = require('path');
const router = express.Router()

// File Upload
const fileStorage = multer.diskStorage({
    destination: 'download', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const fileUpload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 20000000   // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {     
            return cb(new Error('Please upload a File'))
        }
        cb(undefined, true)
    }
})  
    module.exports.fileUpload=fileUpload
    
    // To store  image in Database
    module.exports.allfile= async(req, res) => {
        try{
            const  salt=10;
            const hashPassword= await bcrypt.hash(req.query.password,salt)

            let userData={
                username:req.query.username,
                password:hashPassword,
                email:req.query.email,
                image:req.file.filename
            }

            var sql = "INSERT INTO users SET ?";
            let query=connection.query(sql,userData,(err,result)=>{
            if(err) {
                console.log(err)
                return res.status(400).send("Duplicate Email")
            }else{

                console.log("file added successfully in DB!!")
                
                return res.send("file added suceefully in DB!!!")
            }
            
            })

        }catch(error){
            return res.send("Email already exists!!!")
        }
    
    }


