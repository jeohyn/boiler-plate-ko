const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,//space바 없애줌
        unique:1 //email 같은 건 오직 1개뿐
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{//유효성 관리
        type:String,
    },
    tockenExp:{//토큰 유효기간
        type:Number
    }
})

const User=mongoose.model('user', userSchema)//user:모델의 이름

module.exports={User}//다른 곳에서도 User 모델 사용가능