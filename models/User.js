const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

//salt는 10자리
const saltRounds=10

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

//user모델에 save()실행 전에 실행 할 것.
userSchema.pre('save', function(next){
    var user=this;
    //비밀번호 변경시
    if(user.isModified('password')){
        //salt생성
        bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err) //next()실행 시 다시 index.js로 돌아가서 실행 진행
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            //salt 이용해서 비밀번호 암호화
            user.password=hash
            next()
            });
        });
    }else{
        next()
    }
})

userSchema.methods.comparePassword=function(plainPassword, cb_fun){
    //plainPassword vs password in db(bcrypt)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb_fun(err)
        cb_fun(null, isMatch)
    })
}

userSchema.methods.generateToken=function(cb_fun){
    var user=this
    //jsonwebtoken으로 token 생성. db에 저장된 id항목 이름이 _id
    //user._id+'secretToken'=token. ->token과 'secretToken'을 통해 user._id 알 수 있음
    var token=jwt.sign(user._id.toJSON(), 'secretToken')

    user.token=token
    user.save(function(err, user){
        if(err) return cb_fun(err)
        cb_fun(null, user)
    })
    
}

userSchema.statics.findByToken=function(token, cb_fun){
    var user=this
    //복호화(decode)
    jwt.verify(token, 'secretToken', function(err, decoded){
        //user._id로 user찾아 db의 token과 비교
        user.findOne({"_id":decoded, "token":token}, function(err, user){
            if(err) return cb_fun(err)
            cb_fun(null, user)
        })
    })
}

const User=mongoose.model('user', userSchema)//user:모델의 이름

module.exports={User}//다른 곳에서도 User 모델 사용가능

/*
methods vs statics
Use method on individual documents if you want to manipulate the individual document like adding tokens etc. 
Use the statics approach if you want query the whole collection.
(https://stackoverflow.com/questions/39708841/what-is-the-use-of-mongoose-methods-and-statics)
*/