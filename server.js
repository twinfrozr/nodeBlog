const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()
const Article = require('./models/article')
const methodOverride = require('method-override')

//db connection
mongoose.connect('mongodb://localhost/blog')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

//index route//

app.get('/', async (req,res)=>{

    const articles = await Article.find().sort({
        createdAt:'desc'
    })

    res.render("articles/index",{articles:articles})
})

//----article routes----//
app.use('/articles', articleRouter)


app.listen(5000)