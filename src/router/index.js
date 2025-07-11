

/**
 * 路由自动注册
 */

const fs = require('fs')

function registerRouters (app){

    const files = fs.readdirSync(__dirname)

    // console.log(files);

    for(const file of files){
        
        if(!file.endsWith('.router.js')) continue

        const router = require(`./${file}`)

        app.use(router.routes())
        app.use(router.allowedMethods())
    }


    
}

module.exports = {registerRouters}