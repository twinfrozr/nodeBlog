const jwt = require('jsonwebtoken')

const authenticate = (req,res,next)=>{

    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,'secretValue1')

        req.user = decode
        console.log(req.user)
        next()
    }
    catch(error){
        console.log("You do not have permission to do that!")
        res.redirect('/')
    }
    
}

module.exports = authenticate