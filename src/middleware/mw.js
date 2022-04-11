const jwt = require("jsonwebtoken")
const bookModel = require("../models/bookModel")

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "login is required" })
        let decodedtoken = jwt.verify(token, "Secret-Key")
        if (!decodedtoken) return res.status(401).send({ status: false, msg: "token is invalid" })

        next()
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}


const authorisation = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        let decodedtoken = jwt.verify(token, "Secret-Key")

        let toBeupdatedbookId = req.params.bookId
        if (toBeupdatedbookId) {

            let updatinguserId = await bookModel.find({ _id: toBeupdatedbookId }).select({ userId: 1, _id: 0 })
            let userId = updatinguserId.map(x => x.userId)

            let id = decodedtoken.userId
            if (id != userId) return res.status(403).send({ status: false, msg: "You are not authorised to perform this task" })
        }
        else {
            toBeupdatedbookId = req.body.userId
            let id = decodedtoken.userId
            console.log(toBeupdatedbookId)

            if (id != toBeupdatedbookId) return res.status(403).send({ status: false, msg: 'You are not authorised to perform this task' })
        }

        next();
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}



module.exports.authentication = authentication;
module.exports.authorisation = authorisation;