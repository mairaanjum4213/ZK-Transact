import jwt from 'jsonwebtoken';
import ENV from "../config.js";
/** auth middleware */
export default async function Auth(req, res, next) {
    try {

        // access authorize header to validate request
        //get bearer token
        const token = req.headers.authorization.split(" ")[1]; //to remove bearer and space split is used


        // retrive the user details fo the logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET); //return decoded token

        req.user = decodedToken;
        next();

    } catch (error) {
        res.status(401).json({ error: "Authentication Failed!" })
    }
}

//need local variables to access otp
export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}