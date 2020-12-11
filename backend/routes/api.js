const express = require('express');
const router = express.Router();
//2.connect with mongodbatlas
const mongoose = require('mongoose');// requre mongoose

const User = require('../model/user')//3. require user schema/model
const Admin=require('../model/admin')
//const db = 'mongodb+srv://parvathy:parvathy@cluster0.hhbpd.mongodb.net/localdatalib?retryWrites=true&w=majority';
const db='mongodb+srv://admin:admin123@mycluster.vxmyt.mongodb.net/Jobportal_Db?retryWrites=true&w=majority'
mongoose.connect(db,function(err){
    if(err){
        console.error('Error !! '+ err)
    }else{
        console.log('connected to mongodb')
    }
})

//3.register api
router.post('/register',(req,res) =>{
    let userData = req.body
    let user = new User(userData)
    user.save((err,registeredUser) =>{
        if(err){
            console.log(err)

        }else{
            res.status(200).send(registeredUser)
        }
    })
})

//4.create login api
router.post('/login',(req,res) =>{
let userData = req.body;
User.findOne({email: userData.email},(err,user) => {
    if(err){
        console.group(err);
    }else{
        if(!user){
            res.status(401).send('Invalid Email')
        }else
        if(user.password !== userData.password){
            res.status(401).send('Invalid Password')

        }else{
            res.status(200).send(user)

        }
    }
})
})

router.post('/admin/add',(req,res)=>{
    new Admin(req.body).save((err,jobD) =>{
    (err)?console.log(err):res.status(200).send(jobD)
    })
})

router.get('/admin/view',(req,res)=>{
Admin.find()
.then(function(data){
    res.send(data);
});
})

router.get('/admin/editjob/:id',(req,res)=>{
    Admin.findById(req.params.id, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
})
router.put('/admin/update/:id',(req,res)=>{
    Admin.findByIdAndUpdate(req.params.id,(error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data)
          console.log('Data updated successfully')
        }
      })
    })
    
    // Delete product
    router.delete('/admin/delete/:id',(req, res, next) => {
      ProductData.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: data
          })
        }
      })
    })

module.exports = router;