const {User}=require('../models/User')

//인증처리
let auth=(req, res, next)=>{
    //client cookie에서 토큰 가져옴
    let toekn=req.cookies.x_auth
    //toekn 복호화 후 db에서 user 검색
    User.findByToken(toekn, (err, user)=>{
        if(err) throw err;
        //user 없음
        if(!user) return res.json({isAuth:false, error:true})
        //user 있음
        req.token=token
        req.user=user
        next()
    })

}

module.exports={auth}