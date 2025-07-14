const connection = require("../app/database")

class PermissionService{

    async momentPermission(resource, momentId,userId){

        const statement = `SELECT * FROM ${resource} WHERE id = ? AND user_id = ?;`
        const [result] = await connection.execute(statement,[momentId,userId])
        console.log(!!result[0]);
        
        return !!result[0]
    }
}

module.exports = new PermissionService  