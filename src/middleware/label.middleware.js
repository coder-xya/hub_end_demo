const LabelService = require("../service/label.service")

const verifyLabelExists = async (ctx,next)=>{

    const {labels} = ctx.request.body

    const newLabels = []

    for(const name of labels){

        const result = await LabelService.queryLabelByName(name)

        const labelObj = {name}

        if (result) {
            labelObj.id = result.id
            
        }else{
            const insertResult = await LabelService.create(name)
            labelObj.id = insertResult.insertId
        }

        newLabels.push(labelObj)
        // console.log(newLabels);

    }

    ctx.labels = newLabels


    await next()

}


module.exports = {
    verifyLabelExists
}