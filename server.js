require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const authRoute = require('./routes/auth')
const app = express()
const Article = require('./models/article')
const User = require('./models/User')
const methodOverride = require('method-override')

//db connection
mongoose.connect('mongodb+srv://nodeblog:nodeblog@cluster0.2ohcyq7.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('connected',()=>{
    console.log('Mongodb connected');
});
mongoose.connection.on('error',()=>{
    console.log('Mongodb not connected v2');
});
//----------------------------------------------------//

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(cookieParser())

//index route//

app.get('/', async (req,res)=>{

    const articles = await Article.find().sort({
        createdAt:'desc'
    })
    
    res.render("articles/index",{articles:articles})

})


//----article routes----//

app.use('/articles', articleRouter)

//-----authenticate route------//
app.use('/',authRoute)



const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Listening at ${PORT}`));