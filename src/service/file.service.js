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
}


module.exports = new FileService