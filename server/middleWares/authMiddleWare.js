import jwt from "jsonwebtoken";

const authMiddleWare = function (req, res, next) {
    try {
        const token = req.header("authorization").replace("Bearer ", "");
        // console.log(token)
        const decryptedData = jwt.verify(token, process.env.JWT);
        // req.body.userId = decryptedData.userId;
        console.log(req.body)
        next();
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
}

export default authMiddleWare;