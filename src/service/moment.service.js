co/st connection = require("../app/database")



class MomentService {
    //
   async create(id,content){

    const statement = 'INSERT INTO `moment` (user_id,content) values (?,?); '

    const [result] = await connection.execute(statement,[id,content])

    return result

    }
//
    async queryList(limit,offset){
        try {
            const statement = `SELECT 
            m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'createTime',u.createAt,'updateTime',u.updateAt) AS user,
            (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
            (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
            FROM moment m
            LEFT JOIN user u ON u.id = m.user_id
            LIMIT ? OFFSET ?;`


        const [result] = await connection.execute(statement,[String(limit), String(offset)])

        return result
        } catch (error) {
            console.log(error);
            
        }

    }
//
    async queryById(id){
        try {
            //会有问题
            // const statement = `SELECT 
            // m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
            // JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'createTime',u.createAt,'updateTime',u.updateAt) AS user,
            // (
            //     JSON_ARRAYAGG(JSON_OBJECT(
            //         'id',c.id,'content',c.content,'commentId',c.comment_id,
            //         'user',JSON_OBJECT('id',cu.id,'name',cu.name)
            //     ))
            // ) comments,
            // (
            // JSON_ARRAYAGG(JSON_OBJECT(
            //     'id',l.id,'name',l.name
            //     ))
            // ) labels
            // FROM moment m
            // LEFT JOIN user u ON u.id = m.user_id
            // LEFT JOIN comment c ON c.moment_id = m.id
            // LEFT JOIN user cu ON cu.id = c.user_id
            // LEFT JOIN moment_label ml ON ml.moment_id = m.id
            // LEFT JOIN label l ON ml.label_id = l.id
            // WHERE m.id = ?
            // GROUP BY m.id;`

            //写字查询语句
            const statement = `SELECT 
            m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'createTime',u.createAt,'updateTime',u.updateAt) AS user,
            (
                SELECT 
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id',c.id,'content',c.content,'commentId',c.comment_id,'user',JSON_OBJECT('id',cu.id,'name',cu.name)
                    )
                )
                FROM comment c
                LEFT JOIN user cu ON c.user_id = u.id
                WHERE c.moment_id = m.id
            ) comments,
            (
            JSON_ARRAYAGG(JSON_OBJECT(
                'id',l.id,'name',l.name
                ))
            ) labels
            FROM moment m
            LEFT JOIN user u ON u.id = m.user_id
            LEFT JOIN moment_label ml ON ml.moment_id = m.id
            LEFT JOIN label l ON ml.label_id = l.id
            WHERE m.id = ?
            GROUP BY m.id;`


        const [result] = await connection.execute(statement,[id])

        return result
        } catch (error) {
            console.log(error);
            
        }

    }

    //
    async updateById(content,id){
        try {
            const statement = 'UPDATE moment set content = ? WHERE id = ?'
            const [result] = await connection.execute(statement,[content,id])
            return result
            
        } catch (error) {
            console.log(error);
            
        }
    }
    //
    async removeById(id){
        try {
            const statement = 'DELETE FROM moment WHERE id = ?'
            const [result] = await connection.execute(statement,[id])
            return result
            
        } catch (error) {   
            console.log(error);
            
        }
    }
    //查询是否有某个标签
    async hasTheLabel(momentId,labelId){
        const statement = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;'
        const [result] = await connection.execute(statement,[momentId,labelId])
        return !!result.length
    }
    //设置标签
    async addLabel (momentId,labelId){
        const statement = 'INSERT INTO moment_label (moment_id,label_id) values (?,?);'
        const [result] = await connection.execute(statement,[momentId,labelId])
        return result
    }
}


module.exports = new MomentService