const express= require('express');
const Article = require('./../models/article')
const router = express.Router();

//get routes//

//----create new article view------//
router.get('/new',(req,res)=>{

    res.render("articles/new",{article:new Article()})
})

//----show article by id-----//
router.get('/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id)
    if(article == null){
        res.redirect('/')
    }
    res.render("articles/show",{article:article})
})

//----edit article----//
router.get('/edit/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id)
    
    res.render("articles/new",{article:article})
})



//post routes//

//------create new article------//
router.post('/',async (req,res,next)=>{
    req.article = new Article()
    next()
    
},saveAndRedirect('new'))

//put routes//

router.put('/:id',async(req,res,next)=>{
    req.article = await Article.findById(req.params.id)
    next()

},saveAndRedirect('edit'))


//delete route//
router.delete('/:id',async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


//next function
function saveAndRedirect(path) {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.detail = req.body.detail
      try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
      } catch (e) {
        res.render(`articles/${path}`, { article: article })
      }
    }
}
module.exports = router;