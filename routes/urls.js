const express  = require('express');
const URLS = require('../models/Urls');
const base62 = require('base62');

const router = express.Router();

// list all the urls
router.get('/', async(req,res)=>{
        try{
            const  urls = await URLS.find();
            res.status(200).json(urls);
        }catch(err){
            console.log(err);
            res.status(500).json({message : err});
        }
})
// add a new url
router.post('/',async(req,res)=>{
   const shortUrl = base62.encode(Date.now());
   const Url = new URLS({
       LongUrl : req.body.LongUrl,
       ShortUrl : shortUrl.toString()
   });
   try{
   const savedUrl = await Url.save();
    res.status(201).json(savedUrl);
   }
   catch(err){
       res.status(500).json({message : err});
   }
});
//get a specific LongUrl
router.get('/:shortUrl',async(req,res)=>{
    const query = {ShortUrl : req.params.shortUrl}; 
    try{
        const val = await URLS.findOne(query);
        if(val ==null){
            res.status(404).json({
                message : 'Short url not found'
            })
        }
        else{
            return res.status(200).json(val);
        }
    }
    catch(err){
       res.status(500).json({message : err});
    }
})
// delete a url
router.delete('/:shortUrl',async(req,res)=>{
    const query = {ShortUrl : req.params.shortUrl};
    try{
        const removedPost = await URLS.deleteOne(query);
            if(removedPost.deletedCount==0){
                    res.status(404).json({
                        message : 'Short url is not found'
                    })
            }
            else{
                    res.status(200).json(removedPost);
            }
    }catch(err){
        console.log(err);
        res.status(500).json({message : err});
    }
})
// update a long url
router.patch('/:shortUrl',async(req,res)=>{
    try{
        const updatedPost = await URLS.updateOne(
            {ShortUrl : req.params.shortUrl},
            {LongUrl : req.body.LongUrl}
            );
        if(updatedPost.modifiedCount == 0){
           res.status(404).json({
                message : "short url not found"
            })
        }
        else{
            res.status(200).json(updatedPost);
        }
    }
    catch(err){
        res.status(500).json({
            message : err
        });
    }
})

module.exports = router;

