const connection = require("../app/database")

class LabelService {
    async create(name){
        try {

            const statement = 'INSERT INTO `label` (name) values (?);'
            const [result] = await connection.execute(statement,[name])

            return result
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async queryLabelByName (name){
        try {
            const statement = 'SELECT * FROM `label` WHERE name = ?;'
            const [result] = await connection.execute(statement,[name])

            return result[0]
            
        } catch (error) {
            console.log(error);
            
        }
    }
}


module.exports = new LabelService