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
            res.status(505).json({message : err});
        }
})
// add a new url
router.post('/',async(req,res)=>{
   const shortUrl = base62.encode(Date.now());
   console.log(shortUrl);
   const Url = new URLS({
       LongUrl : req.body.LongUrl,
       ShortUrl : shortUrl.toString()
   });
   try{
   const savedUrl = await Url.save();
    res.status(201).json(savedUrl);
   }
   catch(err){
       console.log(err);
       res.status(500).json({message : err});
   }
});
//get a specific LongUrl
router.get('/:shortUrl',async(req,res)=>{
    const query = {ShortUrl : req.params.shortUrl}; 
    try{
        const val = await URLS.findOne(query);
        res.json(val);
    }
    catch(err){
       res.status(404).json({message : err});
    }
})
// delete a url
router.delete('/:shortUrl',(req,res)=>{
    const query = {shortUrl : req.params.shortUrl};
    try{
        const val = await URLS.remove(query);
        res.status(200).json(val);
    }catch(err){
        res.status(404).json({message : err});
    }
})

module.exports = router;

