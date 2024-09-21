import jwt from "jsonwebtoken";

//verify the token
export const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization");

    if(!token) res.status(401).json({message: "No token, authorization failed!"});

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode.user;
        next();
    } catch (error) {
        console.error(error.message);
        //in the case where token has expired
        if(error.name === "TokenExpiredError") res.status(401).json({message: "Token is expired!"});

        res.status(401).json({message: "Token is not valid"});
    }
}