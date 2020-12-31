//백엔드 서버의 시작점 파일
const express = require('express')
const app = express()
const port = 5000
const bodyParser=require('body-parser')//받아온 정보를 서버에서 분석 가능

//비밀정보 가져오기
const config=require('./config/key')

//application/x-www-form-urlencoded을 분석 가능하게함
app.use(bodyParser.urlencoded({extended:true}))

//application/json을 분석 가능하게 함
app.use(bodyParser.json())

const{User}=require("./models/User")

const mongoose=require('mongoose')
//비밀정보부분(id, passwd)
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hi there!')
})

 //회원가입 시 필요 정보 client에서 가져와 디비에 삽입
app.post('/register', (req, res)=>{
  //req.body에는 User에 필요한 정보가 들어가있음(body-parser 덕분)
  const user=new User(req.body)
  user.save((err, userInfo)=>{//mongoDB에 의한 메소드. 정보를 user모델에 저장
    if(err) return res.json({success:false, err})//json형식으로 err 전달
    return res.status(200).json({success:true})
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

