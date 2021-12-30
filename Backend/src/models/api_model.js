const mongoose = require('mongoose');

const api_schema = mongoose.Schema({
    id:{
        type:String,
        default:'API_HARBOUR_01',
    },
    name:{
        type:String,
        default:'Harbour_BACKEND_V1',
    },
    version:{
        type:mongoose.Decimal128,
        default:1.1
    },
    technology:{
        type:Array,
        default:['NodeJs','ExpressJs','MongooseJs','MonogoDB','HBS','HTML_CSS','JQuery']
    },
    total_user:{
        type:Number,
        default:0
    },
    admins:{
        type:Array,
        default:[{uid:'root',pwd:'toor'}]
    }
    
});

const API = mongoose.model('api_detail',api_schema);
module.exports = API;