const express = require('express');
const router = express.Router(); //middle wear
//const jwt=require('jsonwebtoken')
//2.connect with mongodbatlas
const mongoose = require('mongoose');// require mongoose

const User = require('../model/user')//3. require user schema/model
const Admin=require('../model/admin');

// const db='mongodb+srv://parvathy:parvathy@cluster0.hhbpd.mongodb.net/localdatalib?retryWrites=true&w=majority'
//const db = 'mongodb+srv://parvathy:parvathy@cluster0.hhbpd.mongodb.net/localdatalib?retryWrites=true&w=majority';
const db='mongodb+srv://user_bhagitha:Bhagitha9072%40@mycluster.74kgk.azure.mongodb.net/JobPortalDB?retryWrites=true&w=majority'
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
            let payload = {subject:user._id}
            let token = jwt.sign(payload,'secretkey')
            res.status(200).send({token})
            //res.status(200).send(registeredUser)
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
            let payload = {subject:user._id}
            let token = jwt.sign(payload,'secretkey')
            res.status(200).send({token})
            // res.status(200).send(user)

        }
    }
})
})
// localhost:3000/api/admin/add
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
/* UPDATE BOOK */
router.put('/admin/update/:id', function(req, res, next) {
   
   Admin.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post); 
  });
});

/* DELETE BOOK */
router.delete('/admin/delete/:id', function(req, res, next) {
   Admin.findByIdAndRemove(req.params.id,function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
  })

module.exports = router;