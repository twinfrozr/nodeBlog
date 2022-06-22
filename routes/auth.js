const express= require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')



// add a new user
router.post('/register',(req,res,next)=>{

    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        let user = new User({
            username:req.body.username,
            
            password:hashedPass
    
        })
        user.save()
        .then(user=>{
            res.json({
                message:'User Added Successfully'
            })
        })
        .catch(error=>{
            res.json({
                message:'Error!'
            })
        })
    })

})


// User login
router.post('/login',(req,res,next)=>{
    var username = req.body.username
    var password = req.body.password
    
    User.findOne({username:username})
    .then(user=>{
        if(user){
            console.log(user)
            bcrypt.compare(password,user.password, function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({username: user.username},'secretValue1',{expiresIn:'3h'})
                    res.redirect("/")
                    // res.json({
                    //     message: 'Login successful',
                    //     token
                    // })
                }else{
                    res.json({
                        message:'Password does not match!'
                    })
                }


            })

        }else{
            res.json({
                message:'User not found'
            })
        }

    })
})


router.get('/login', (req,res)=>{


    res.render("articles/users/login")
    

})

module.exports = router
