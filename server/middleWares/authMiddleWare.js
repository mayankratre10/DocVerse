import jwt from "jsonwebtoken";

const authMiddleWare = function (req, res, next) {
    try {
        console.log("authMiddleWare",req.body)
        const token = req.header("authorization").replace("Bearer ", "");
        // console.log(token)
        const decryptedData = jwt.verify(token, process.env.JWT);
        // req.body.userId = decryptedData.userId;
        next();
    } catch (error) {
        return res.send({
            success: false,
            message: "Failed in authMiddleWare:" + error.message,
        });
    }
}

export default authMiddleWare;