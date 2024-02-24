import UserModel from '../model/User.model.js';
import SellTokenModel from '../model/SellToken.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from "../config.js";
import otpGenerator from 'otp-generator';


/** middleware for verify user */
//first verify the user during login then move to login controller
export async function verifyUser(req, res, next) {
    try {

        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Username not exist!" });
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}*/

export async function register(req, res) {
    try {
        const { username, password, email,fullName,region} = req.body;
        // Check existing user
        const existingUsername = await UserModel.findOne({ 'username': username });
        if (existingUsername) {
            return res.status(400).send({ error: "Please provide a unique username" });
        }

        // Check existing email
        const existingEmail = await UserModel.findOne({ 'email': email });
        if (existingEmail) {
            return res.status(400).send({ error: "Please provide a unique email" });
        }

        // Hash password and create new user
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            //storing the data in mongodb
            const newUser = new UserModel({
                username,
                password: hashedPassword,
                email,
                fullName,
                region
                
            });
            const result = await newUser.save();
            console.log(`Username: ${username}, Email: ${email}, Full Name: ${fullName}`);
            return res.status(201).send({ msg: "User registered successfully" });
        }
    } catch (error) {
        return res.status(500).send({ error: error.message || "Internal server error" });
    }

}


/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
    const { username, password } = req.body;

    try {

        UserModel.findOne({ username })
            .then(user => {
                //compare the user entered password with store password in db
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        //if no value
                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" });

                        // create jwt token for authentication
                        const token = jwt.sign({
                            userId: user._id,  //payload
                            username: user.username
                        }, ENV.JWT_SECRET, { expiresIn: "10m" });

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });

                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found" });
            })

    } catch (error) {
        return res.status(500).send({ error });
    }

}


/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
    const { username } = req.params;  // Getting the value from route

    try {
        if (!username) {
            return res.status(400).send({ error: "Invalid Username" });
        }
        //lean return js object instead of mongoose doc
        const user = await UserModel.findOne({ username }).lean();

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Remove sensitive data like password before sending response
        //destructure password
        const { password, ...rest } = user;

        return res.status(200).send(rest);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}


/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    fullName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
    try {
        // const id = req.query.id;
        //accesing the userid from auth middlewARE only authrized user can update
        const { userId } = req.user;   //no need to pass any query param

        if (userId) {
            const body = req.body;

            const updateResult = await UserModel.updateOne({ _id: userId }, body);

            return res.status(201).send({ msg: "Update operation completed successfully" });
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}



/** GET: http://localhost:8080/api/generateOTP */
//when user want to update password call this endpoint
//pass username in query as there verify user controller is called first
export async function generateOTP(req, res) {
    //getting OTP car from local variables middleware
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    res.status(201).send({ code: req.app.locals.OTP });
}


/** GET: http://localhost:8080/api/verifyOTP */
//pass username  and otp in query as verify user controller is called first
export async function verifyOTP(req, res) {
    const code = req.query.code;

    // Check if the 'code' query parameter exists and is a valid number
    if (!code || isNaN(parseInt(code))) {
        return res.status(400).send({ error: "Invalid OTP format" });
    }

    // Convert code and compare it to the stored OTP
    const enteredCode = parseInt(code);
    const storedOTP = parseInt(req.app.locals.OTP);

    if (enteredCode === storedOTP) {
        req.app.locals.OTP = null; // Reset the OTP value
        req.app.locals.resetSession = true; // Start session for reset password
        return res.status(201).send({ msg: 'Verification successful!' });
    }

    return res.status(400).send({ error: "Invalid OTP" });
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */

//redirect the user to reset password page when user has valid otp
export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
         return res.status(201).send({ flag : req.app.locals.resetSession})
    }
    return res.status(440).send({error : "Session expired!"})
 }



// update the password when we have valid session or otp
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
    try {
        //we can reset password if we have valid session and verified otp
        if (!req.app.locals.resetSession) {
            return res.status(440).send({ error: "Session expired!" });
        }

        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "Username not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

        req.app.locals.resetSession = false;
        
        return res.status(201).send({ msg: "Password updated successfully" });
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
}


//-------------------------- SELL TOKENS

export async function sellToken(req, res) {
    try {
        const {seller,sellerMetamask, purchaserName, accountNumber, accountComments, transactionFee, localCurrencyAmount, accountName,Tokens ,contractHash,} = req.body;
   
        const newSellTokens = new SellTokenModel({
            seller,
            sellerMetamask,
            purchaserName,
            accountNumber,
            accountComments,
            accountName,
            transactionFee,
            contractHash,
            localCurrencyAmount,
            Tokens
        });

        const result = await newSellTokens.save();

        return res.status(201).send({ msg: "Sell Tokens data stored Successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message || "Internal server error" });
    }
}

