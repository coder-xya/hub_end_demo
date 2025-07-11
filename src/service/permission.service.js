const connection = require("../app/database")

class PermissionService{

    async momentPermission(momentId,userId){

        const statement = 'SELECT * FROM moment WHERE id = ? AND user_id = ?;'
        const [result] = await connection.execute(statement,[momentId,userId])
        console.log(!!result[0]);
        
        return !!result[0]
    }
}

module.exports = new PermissionService  