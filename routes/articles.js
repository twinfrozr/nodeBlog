const express= require('express');
const Article = require('./../models/article')
const router = express.Router();
const authenticate = require('../middleware/authenticate')

//get routes//

//verify token in header
router.get('/protected',authenticate,(req,res)=>{
    
    res.send("Token verified in header!")
})

//----create new article view------//



router.get('/new',(req,res)=>{

    res.render("articles/new",{article:new Article()})
})

//----show article by id-----//
router.get('/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id)
    if(article == null){
        res.status(404).json({
            message:"Data Not found"
         })
        
    }
    res.status(200).json({
        article
     })
    //res.render("articles/show",{article:article})
})

//----edit article----//
router.get('/edit/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id)
    
    res.render("articles/new",{article:article})
})



//post routes//

//------create new article------//
router.post('/',authenticate,async (req,res,next)=>{
    const article = new Article({
        title:req.body.title,
        description:req.body.description,
        detail:req.body.detail
    })
    //req.article = new Article()
    try{
        const newArticle = await article.save()
        res.status(201).json(newArticle) 

    }catch(e){
        res.status(400)
    }
    
})

//put routes//

router.put('/:id',authenticate,async(req,res,next)=>{
    const article = await Article.findById(req.params.id)
    let updatedArticle = article
    updatedArticle.title = req.body.title
    updatedArticle.description = req.body.description
    updatedArticle.detail = req.body.detail

    try {
        const savedArticle = await updatedArticle.save()
        res.status(201).json({
            message:"Updated Sucessfully",
            savedArticle
        })
        
      } catch (e) {
        res.status(404).json({
            message:"Data Not found"
        })
      }

})


//delete route//
router.delete('/:id',authenticate,async(req,res)=>{
    
    try{
        const article = await Article.findByIdAndDelete(req.params.id)
        res.json({
            article,
            message:"Deleted Successfully"
        })
        //res.redirect('/');
    }catch(e){
        res.status(404).json({message:e.message})
    }
    
})


//next function
// function saveAndRedirect(path) {
//     return async (req, res) => {
//       let article = req.article
//       article.title = req.body.title
//       article.description = req.body.description
//       article.detail = req.body.detail
//       try {
//         article = await article.save()
//         res.status(201).json(article)
//         //res.redirect(`/articles/${article.id}`)
//       } catch (e) {
//         res.status(404).json({
//             message:"Data Not found"
//         })
//         //res.render(`articles/${path}`, { article: article })
//       }
//     }
// }
module.exports = router;