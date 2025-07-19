const connection = require("../app/database")


class FileService {
    async avatarCreate (filename,mimetype,size,userId){

        try {
            const statement = 'INSERT INTO avatar (filename,mimetype,size,user_id) values (?,?,?,?);'

            const [result] = await connection.execute(statement,[filename,mimetype,size,userId])

            return result
        } catch (error) {
            console.log(error);
            
        }

    }

    async queryAvatarWithUser(userId){
        try {

            const statement = 'SELECT * FROM avatar WHERE user_id = ?;'

            const [result] = await connection.execute(statement,[userId])

            // return result[result.length -1]
            return result.pop()
        } catch (error) {
            console.log(error);
            
        }
    }
}


module.exports = new FileService