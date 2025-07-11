const connection = require("../app/database")



class MomentService {
   async create(id,content){

    const statement = 'INSERT INTO `moment` (user_id,content) values (?,?); '

    const [result] = await connection.execute(statement,[id,content])

    return result

    }

    async queryList(limit,offset){
        try {
                    const statement = `SELECT 
            m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) AS user
            FROM moment m
            LEFT JOIN user u ON u.id = m.user_id
            LIMIT ? OFFSET ?;`


        const [result] = await connection.execute(statement,[String(limit), String(offset)])

        return result
        } catch (error) {
            console.log(error);
            
        }

    }
}


module.exports = new MomentService