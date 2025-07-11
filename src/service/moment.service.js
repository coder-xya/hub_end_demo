const connection = require("../app/database")



class MomentService {
   async create(id,content){

    const statement = 'INSERT INTO `moment` (user_id,content) values (?,?); '

    const [result] = await connection.execute(statement,[id,content])

    return result

    }
}


module.exports = new MomentService