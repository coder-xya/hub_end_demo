const jwt = require("jsonwebtoken")
const { PRIVATE_KEY } = require("../config/screctKeys")

class LoginController {
    //签发令牌
    sign (ctx,next){
        const {id,name} = ctx.user
        
        /**
         * 使用openssl来生成一对私钥和公钥
         * Mac直接使用terminal终端即可
         * Windows默认的cmd终端是不能直接使用的，建议直接使用git bash终端
         * 
         * openssl genrsa -out private.key 2048 生成长度为2048的私钥
         * 注意：secretOrPrivateKey has a minimum key size of 2048 bits for RS256
         * openssl rsa -in private.key -pubout -out public.key 根据私钥生成公钥
         */
        
        const token = jwt.sign({ id, name }, PRIVATE_KEY,{
            expiresIn: 24 * 60 * 60, //token过期时间m    
            algorithm: 'RS256' //使用rs256算法加密
        })
        console.log(token,"token");
        

        ctx.body = {code:0,data:{id,name,token}}

    }
}

module.exports = new LoginController
