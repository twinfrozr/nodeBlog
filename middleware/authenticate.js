const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authenticate = async(req,res,next)=>{

    try{
        const token = req.headers.token;
        //console.log("token: "+ token);
        const decode = jwt.verify(token,'secretValue1')

        //console.log(decode)
        const user = decode.username;
        const userFromdb = await User.findOne({username:user})
        
        if(userFromdb){
            next()
        }
    }
    catch(error){
        console.log("You do not have permission to do that!")
        res.redirect('/')
    }
    
}

module.exports = authenticate