if(process.env.NODE_ENV==='production'){//after deploy
    module.exports=require('./prod')
}else{//in local env
    module.exports=require('./dev')
}