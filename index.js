//백엔드 서버의 시작점 파일
const express = require('express')
const app = express()
const port = 5000
const bodyParser=require('body-parser')//받아온 정보를 서버에서 분석 가능
const cookieParser=require('cookie-parser')


app.use(cookieParser())

//비밀정보 가져오기
const config=require('./config/key')

//application/x-www-form-urlencoded을 분석 가능하게함
app.use(bodyParser.urlencoded({extended:true}))

//application/json을 분석 가능하게 함
app.use(bodyParser.json())

const{User}=require("./models/User")
const {auth}=require("./middleware/auth")

const mongoose=require('mongoose')
const { urlencoded } = require('body-parser')
//비밀정보부분(id, passwd)
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hi there!')
})

 //회원가입 시 필요 정보 client에서 가져와 디비에 삽입
app.post('/api/users/register', (req, res)=>{
  //req.body에는 User에 필요한 정보가 들어가있음(body-parser 덕분)
  const user=new User(req.body)
  user.save((err, userInfo)=>{//mongoDB에 의한 메소드. 정보를 user모델에 저장
    if(err) return res.json({success:false, err})//json형식으로 err 전달
    return res.status(200).json({success:true})
  })
})

app.post('/api/users/login', (req, res)=>{

  //db안에서 요청된 이메일 있는지 찾기
  User.findOne({email:req.body.email}, (err, user)=>{
    if(!user){
      return res.json({loginSuccess:false,
      message :"이메일에 해당하는 유저가 없습니다."
      })
    }
    //이메일이 db에 있으면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch)
        return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다."})

      //비밀번호 맞다면 그 유저를 위한 토큰 생성
      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err)
        
        //쿠키에 x_auth란 항목으로 token 저장
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess:true, userId:user._id})
      })
    })
  })
})

//api/users/auth로 request 받은 후 callback fun하기 전에 auth실행->auth:middleware
app.post('/api/users/auth', auth, (req, res)=>{
  //middleware 통과->authentication is true
  res.status(200).json({
    _id:req.user._id,
    isAdmin:req.user.role===0?false:true, //role===0 is admin
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname,
    role:req.user.role,
    image:req.user.image

  })
})

app.post('/api/users/logout', auth, (req, res)=>{
  User.findOneAndUpdate({_id:req.user._id},
    {token:""}, //token삭제
    (err, user)=>{
      if(err) return res.json({success:false, err})
      return res.status(200).send({success:true})
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

