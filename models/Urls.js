const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    LongUrl : {
        type : String,
        required :true,

    },
    ShortUrl : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('URLS',UrlSchema);