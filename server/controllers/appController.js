import UserModel from "../model/User.model.js";
import SellTokenModel from "../model/SellToken.model.js";
import BuyTokenModel from "../model/BuyToken.model.js";
import TransferTokenModel from "../model/TransferToken.model.js";
import AccountModel from "../model/Account.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "otp-generator";
import WalletModel from "../model/Wallet.model.js";

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
    const { username, password, email, fullName, region, gender } = req.body;

    // Check existing user
    const existingUsername = await UserModel.findOne({ username: username });
    if (existingUsername) {
      return res
        .status(400)
        .send({ error: "Please provide a unique username" });
    }
    // Check existing email
    const existingEmail = await UserModel.findOne({ email: email });
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
        region,
        gender,
      });
      const result = await newUser.save();
      return res.status(201).send({ msg: "User registered successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: error.message || "Internal server error" });
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
      .then((user) => {
        //compare the user entered password with store password in db
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            //if no value
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have Password" });

            // create jwt token for authentication
            const token = jwt.sign(
              {
                userId: user._id, //payload
                username: user.username,
              },
              ENV.JWT_SECRET,
              { expiresIn: "40m" }
            );

            return res.status(200).send({
              msg: "Login Successful...!",
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password does not Match" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Username not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  const { username } = req.params; // Getting the value from route

  try {
    if (!username) {
      return res.status(400).send({ error: "Invalid Username" });
    }
    //lean return js object instead of mongoose doc
    const user = await UserModel.findOne({ username })
      .populate("accounts")
      .populate("wallet")
      .lean();

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

//get user by id//
export const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all users//

export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

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
    const { userId } = req.user; //no need to pass any query param

    if (userId) {
      const body = req.body;

      const updateResult = await UserModel.updateOne({ _id: userId }, body);

      return res
        .status(201)
        .send({ msg: "Update operation completed successfully" });
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
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
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
    return res.status(201).send({ msg: "Verification successful!" });
  }

  return res.status(400).send({ error: "Invalid OTP" });
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */

//redirect the user to reset password page when user has valid otp
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
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

    await UserModel.updateOne(
      { username: user.username },
      { password: hashedPassword }
    );

    req.app.locals.resetSession = false;

    return res.status(201).send({ msg: "Password updated successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

//_________________________________________________ ↓  Sell  Tokens ↓
// POST
export async function sellToken(req, res) {
  try {
    const {
      seller,
      sellerMetamask,
      purchaserName,
      accountNumber,
      accountComments,
      transactionFee,
      localCurrencyAmount,
      accountName,
      Tokens,
      contractHash,
    } = req.body;
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
      Tokens,
    });
    const result = await newSellTokens.save();
    return res
      .status(201)
      .send({ msg: "Sell Tokens data stored Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: error.message || "Internal server error" });
  }
}
//GET
//http://localhost:8080/api/getselltokens/ selltokenmongodb id 65dac660422196608d384587
export async function userwithSellToken(req, res) {
  try {
    const sellToken = await SellTokenModel.findOne()
      .sort({ createdAt: -1 })
      .populate("seller", ["username", "email"]);
    if (sellToken) {
      res.status(200).json(sellToken);
    } else {
      res.status(404).json({ message: "SellToken Instance not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function userwithSellTokenwithId(req, res) {
  try {
    const sellToken = await SellTokenModel.findById(
      req.params.sellTokenId
    ).populate("seller", ["username", "email"]);

    if (sellToken) {
      res.status(200).json(sellToken);
    } else {
      res.status(404).json({ message: "SellToken not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//_________________________________________________ ↑  Sell  Tokens  ↑

//_________________________________________________ ↓  Transfer Tokens ↓
//POST

export async function transferToken(req, res) {
  try {
    const {
      sender,
      beneficiaryMetamask,
      senderMetamask,
      transferTokenAmount,
      transferContractHash,
    } = req.body;
    const newTransferTokens = new TransferTokenModel({
      sender,
      beneficiaryMetamask,
      senderMetamask,
      transferTokenAmount,
      transferContractHash,
    });
    const result = await newTransferTokens.save();
    return res
      .status(201)
      .send({ msg: "Transfer Tokens data stored Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: error.message || "Internal server error" });
  }
}
//GET
//http://localhost:8080/api/getTransferTokens/transferTokenId
export async function userwithTransferToken(req, res) {
  try {
    const { senderId } = req.params;
    const transferToken = await TransferTokenModel.findOne({ sender: senderId })
      .sort({
        transferTokendateTimeField: -1,
      })
      .populate("sender", ["username", "email"]);
    if (transferToken) {
      res.status(200).json(transferToken);
    } else {
      res.status(404).json({ message: "TransferToken Instance not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// http://localhost:8080/api/getTransferTokens
export async function getAllTransferTokens(req, res) {
  const { senderId } = req.params;
  try {
    const allTransferTokens = await TransferTokenModel.find({
      sender: senderId,
    }).populate("sender", ["username", "email"]);

    if (allTransferTokens.length > 0) {
      res.status(200).json(allTransferTokens);
    } else {
      res.status(404).json({ message: "No transfer tokens found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//_________________________________________________ ↑ Transfer  Tokens ↑

// ___________buy tokens_________//

export async function buyToken(req, res) {
  console.log(req.file);

  const {
    buyer,
    metamaskAddress,
    serviceProviderName,
    localCurrency,
    TokensAmount,
    transactionFee,
  } = req.body;

  const buyReceipt = req.file.filename;

  try {
    const newBuyTokens = new BuyTokenModel({
      buyer,
      metamaskAddress,
      serviceProviderName,
      localCurrency,
      TokensAmount,
      transactionFee: transactionFee,
      buyReceipt,
    });

    const result = await newBuyTokens.save();

    return res.status(201).send({ msg: "Buy Tokens data stored Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: error.message || "Internal server error" });
  }
}

export async function userwithBuyToken(req, res) {
  try {
    const buyToken = await BuyTokenModel.findOne()
      .sort({ createdAt: -1 })
      .populate("buyer", ["username", "email"]);
    if (buyToken) {
      res.status(200).json(buyToken);
    } else {
      res.status(404).json({ message: "BuyToken not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function userwithBuyTokenwithId(req, res) {
  try {
    const buyToken = await BuyTokenModel.findById(
      req.params.buyTokenId
    ).populate("buyer", ["username", "email"]);

    if (buyToken) {
      res.status(200).json(buyToken);
    } else {
      res.status(404).json({ message: "BuyToken not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//_________________________________________________ ↓ Merchant Controllers ↓

export async function becomeMerchant(req, res) {
  try {
    const id = req.query.id;

    const user = await UserModel.findById(id);
    if (
      user.kycStatus == true &&
      user.email &&
      user.mobile &&
      user.address &&
      user.fullName
    ) {
      user.isMerchant = true;
      await user.save();
      res.json({
        success: true,
        message: "You become a merchant successfully.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "You do not meet the requirements to become an merchant.",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function updateFee(req, res) {
  try {
    const { userId, fee } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isMerchant) {
      return res.status(403).json({
        success: false,
        message: "Only merchants can update the fee",
      });
    }

    user.merchantFee = fee;
    await user.save();

    res.json({
      success: true,
      message: "Fee updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getMerchants(req, res) {
  try {
    const region = req.query.region;
    const userId = req.query.id;

    let admins;
    const loggedInUser = await UserModel.findById(userId);
    if (loggedInUser && loggedInUser.isMerchant) {
      // If the logged-in user is themselves an admin, exclude them from the response
      admins = await UserModel.find({
        isMerchant: true,
        region: region,
        _id: { $ne: loggedInUser._id },
        accounts: { $exists: true, $ne: [] },
        wallet: { $exists: true },
      })
        .populate("accounts")
        .populate("wallet");
    } else {
      admins = await UserModel.find({
        isMerchant: true,
        region: region,
        accounts: { $exists: true, $ne: [] },
        wallet: { $exists: true },
      })
        .populate("accounts")
        .populate("wallet");
    }
    res.json({ admins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getSpecificMerchant(req, res) {
  try {
    const username = req.query.username;
    const admins = await UserModel.find({
      isMerchant: true,
      username: username,
      accounts: { $exists: true, $ne: [] },
      wallet: { $exists: true },
    })
      .populate("accounts")
      .populate("wallet");

    res.json({ admins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//_________________________________________________ ↑ Merchant Controller↑

//_________________________________________________ ↓ Account Controller↓

export async function createAccountDetails(req, res) {
  try {
    const { accountNumber, accountType, accountName } = req.body;
    const account = await AccountModel.create({
      accountNumber,
      accountType,
      accountName,
    });
    res.status(201).json({ account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function assignAccountToUser(req, res) {
  try {
    const { userId, accountId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const account = await AccountModel.findById(accountId);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    user.accounts.push(accountId);
    await user.save();

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//_________________________________________________ ↑Account Controller↑

//_________________________________________________ ↓Wallet Controller↓

export async function createWalletDetails(req, res) {
  try {
    const { metamaskAddress, zkTokens } = req.body;
    const wallet = await WalletModel.create({ metamaskAddress, zkTokens });
    res.status(201).json({ wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function assignWalletToUser(req, res) {
  try {
    const { userId, walletId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const wallet = await WalletModel.findById(walletId);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    user.wallet = walletId;
    await user.save();

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//_________________________________________________ ↑Wallet  Controller↑

//_________________________________________________ ↓Sell Token Requests to admin↓

export const approveSellToken = async (req, res) => {
  const { id } = req.params;

  try {
    const sellToken = await SellTokenModel.findById(id);
    if (!sellToken) {
      return res.status(404).json({ message: "Sell token not found" });
    }
    sellToken.transactionStatus = "Pending";
    await sellToken.save();
    return res.status(200).json({
      message: "Sell token approval request sent successfully",
      sellToken,
    });
  } catch (error) {
    console.error("Error approving sell token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPendingSellTokenRequestsForAdmin = async (req, res) => {
  const { username } = req.params;

  try {
    const pendingSellTokens = await SellTokenModel.find({
      purchaserName: username,
      transactionStatus: "Pending",
    }).populate("seller", ["username", "email"]);

    return res.status(200).json(pendingSellTokens);
  } catch (error) {
    console.error(
      `Error fetching pending sell token requests for admin ${username}:`,
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

//dashboard
export const getApprovedSellTokenRequestsForAdmin = async (req, res) => {
  const { username } = req.params;

  try {
    const approvedSellTokens = await SellTokenModel.find({
      purchaserName: username,
      transactionStatus: "Approved",
    })
      .sort({
        Tokens: -1,
      })
      .populate("seller", ["username", "email"]);

    return res.status(200).json(approvedSellTokens);
  } catch (error) {
    console.error(
      `Error fetching pending sell token requests for admin ${username}:`,
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};
//

export const getApprovedSellTokenRequestsForUser = async (req, res) => {
  const { sellerId } = req.params;

  try {
    const approvedSellTokens = await SellTokenModel.find({
      seller: sellerId,
      transactionStatus: { $in: ["Approved", "Declined"] },
    }).populate("seller", ["username", "email"]);

    return res.status(200).json(approvedSellTokens);
  } catch (error) {
    console.error("Error fetching approved sell token requests ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const approveSellTokenByAdmin = async (req, res) => {
  const { id } = req.params;
  const { commentsByAdmin } = req.body;

  try {
    const sellToken = await SellTokenModel.findById(id);
    if (!sellToken) {
      return res.status(404).json({ message: "Sell token not found" });
    }
    sellToken.transactionStatus = "Approved";
    sellToken.commentsByAdmin = commentsByAdmin;
    await sellToken.save();
    return res
      .status(200)
      .json({ message: "Sell tokens request approved", sellToken });
  } catch (error) {
    console.error("Error approving sell token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const rejectSellTokenByAdmin = async (req, res) => {
  const { id } = req.params;
  const { commentsByAdmin } = req.body;

  try {
    const sellToken = await SellTokenModel.findById(id);
    if (!sellToken) {
      return res.status(404).json({ message: "Sell token not found" });
    }
    sellToken.transactionStatus = "Declined";
    sellToken.commentsByAdmin = commentsByAdmin;
    await sellToken.save();
    return res
      .status(200)
      .json({ message: "Sell tokens request approved", sellToken });
  } catch (error) {
    console.error("Error approving sell token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//_________________________________________________ ↑Sell Token Requests to admin↑

//_________________________________________________ ↓Buy Token Requests to admin↓

export const approveBuyToken = async (req, res) => {
  const { id } = req.params;

  try {
    const buyToken = await BuyTokenModel.findById(id);
    if (!buyToken) {
      return res.status(404).json({ message: "Buy token not found" });
    }
    buyToken.status = "Pending";
    await buyToken.save();
    return res.status(200).json({
      message: "Buy token approval request sent successfully",
      buyToken,
    });
  } catch (error) {
    console.error("Error approving buy token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPendingBuyTokenRequestsForAdmin = async (req, res) => {
  const { username } = req.params;

  try {
    const pendingSellTokens = await BuyTokenModel.find({
      serviceProviderName: username,
      status: "Pending",
    }).populate("buyer", ["username", "email"]);

    return res.status(200).json(pendingSellTokens);
  } catch (error) {
    console.error(
      `Error fetching pending buy token requests for admin ${username}:`,
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

//for dashboard
export const getApprovedBuyTokenRequestsForAdmin = async (req, res) => {
  const { username } = req.params;

  try {
    const approvedBuyTokens = await BuyTokenModel.find({
      serviceProviderName: username,
      status: "Approved",
    })
      .sort({
        TokensAmount: -1,
      })
      .populate("buyer", ["username", "email"]);

    return res.status(200).json(approvedBuyTokens);
  } catch (error) {
    console.error(
      `Error fetching approved buy token requests for admin ${username}:`,
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

//

export const getApprovedBuyTokenRequestsForUser = async (req, res) => {
  const { buyerId } = req.params;

  try {
    const approvedBuyTokens = await BuyTokenModel.find({
      buyer: buyerId,
      status: { $in: ["Approved", "Declined"] },
    }).populate("buyer", ["username", "email"]);

    return res.status(200).json(approvedBuyTokens);
  } catch (error) {
    console.error("Error fetching approved buy token requests for user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const approveBuyTokenByAdmin = async (req, res) => {
  const { id } = req.params;
  const { adminComments } = req.body;

  try {
    const buyToken = await BuyTokenModel.findById(id);
    if (!buyToken) {
      return res.status(404).json({ message: "Buy token not found" });
    }
    buyToken.status = "Approved";
    buyToken.adminComments = adminComments;
    await buyToken.save();
    return res.status(200).json({
      message: "Buy token approval request sent successfully",
      buyToken,
    });
  } catch (error) {
    console.error("Error approving buy token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const rejectBuyTokenByAdmin = async (req, res) => {
  const { id } = req.params;
  const { adminComments } = req.body;

  try {
    const buyToken = await BuyTokenModel.findById(id);
    if (!buyToken) {
      return res.status(404).json({ message: "Buy token not found" });
    }
    buyToken.status = "Declined";
    buyToken.adminComments = adminComments;
    await buyToken.save();
    return res.status(200).json({
      message: "Buy token approval request sent successfully",
      buyToken,
    });
  } catch (error) {
    console.error("Error approving buy token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//_________________________________________________ ↑Buy Token Requests to admin↑

//_________________________________________Dashbaord

//1
export const getApprovedTokenRequestsForAdmin = async (req, res) => {
  const { username } = req.params;

  try {
    const sellTokenPromise = SellTokenModel.find({
      purchaserName: username,
      transactionStatus: "Approved",
    })
      .sort({
        Tokens: -1,
      })
      .populate("seller", ["username", "email"]);

    const buyTokenPromise = BuyTokenModel.find({
      serviceProviderName: username,
      status: "Approved",
    })
      .sort({
        TokensAmount: -1,
      })
      .populate("buyer", ["username", "email"]);

    const [approvedSellTokens, approvedBuyTokens] = await Promise.all([
      sellTokenPromise,
      buyTokenPromise,
    ]);

    return res.status(200).json({ approvedSellTokens, approvedBuyTokens });
  } catch (error) {
    console.error(
      `Error fetching approved token requests for admin ${username}:`,
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

//2
export const getPendingTokenRequestsCountForAdmins = async (req, res) => {
  const { username } = req.params;

  try {
    const sellTokenCount = await SellTokenModel.countDocuments({
      purchaserName: username,
      transactionStatus: "Pending",
    });

    const buyTokenCount = await BuyTokenModel.countDocuments({
      serviceProviderName: username,
      status: "Pending",
    });

    return res.status(200).json({ sellTokenCount, buyTokenCount });
  } catch (error) {
    console.error(
      `Error fetching pending token requests count for admin ${username}:`,
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTokenRequestsCountForAdmin = async (req, res) => {
  const { username } = req.params;

  try {
    const sellPendingCount = await SellTokenModel.countDocuments({
      purchaserName: username,
      transactionStatus: "Pending",
    });

    const sellApprovedCount = await SellTokenModel.countDocuments({
      purchaserName: username,
      transactionStatus: "Approved",
    });

    const sellDeclinedCount = await SellTokenModel.countDocuments({
      purchaserName: username,
      transactionStatus: "Declined",
    });

    const buyPendingCount = await BuyTokenModel.countDocuments({
      serviceProviderName: username,
      status: "Pending",
    });

    const buyApprovedCount = await BuyTokenModel.countDocuments({
      serviceProviderName: username,
      status: "Approved",
    });

    const buyDeclinedCount = await BuyTokenModel.countDocuments({
      serviceProviderName: username,
      status: "Declined",
    });

    return res.status(200).json({
      sellPendingCount,
      sellApprovedCount,
      sellDeclinedCount,
      buyPendingCount,
      buyApprovedCount,
      buyDeclinedCount,
    });
  } catch (error) {
    console.error(
      `Error fetching token requests count for admin ${username}:`,
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

//3
export const getRecentApprovedTokenRequestsForAdmin = async (req, res) => {
  const { username } = req.params;

  try {
    const sellTokenPromise = SellTokenModel.find({
      purchaserName: username,
      transactionStatus: "Approved",
    })
      .sort({
        SellTokendateTimeField: -1,
      })
      .limit(2)
      .populate("seller", ["username", "email"]);

    const buyTokenPromise = BuyTokenModel.find({
      serviceProviderName: username,
      status: "Approved",
    })
      .sort({
        dateTimeField: -1,
      })
      .limit(2)
      .populate("buyer", ["username", "email"]);

    const [approvedSellTokens, approvedBuyTokens] = await Promise.all([
      sellTokenPromise,
      buyTokenPromise,
    ]);

    return res.status(200).json({ approvedSellTokens, approvedBuyTokens });
  } catch (error) {
    console.error(
      `Error fetching approved token requests for admin ${username}:`,
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

//4
export const getAllTokenRequestsForAdmin = async (req, res) => {
  const { username } = req.params;

  try {
    const sellTokenPromise = SellTokenModel.find({
      purchaserName: username,
    })
      .sort({
        SellTokendateTimeField: -1,
      })
      .populate("seller", ["username", "email"]);

    const buyTokenPromise = BuyTokenModel.find({
      serviceProviderName: username,
    })
      .sort({
        dateTimeField: -1,
      })
      .populate("buyer", ["username", "email"]);

    const [sellTokens, buyTokens] = await Promise.all([
      sellTokenPromise,
      buyTokenPromise,
    ]);

    return res.status(200).json({ sellTokens, buyTokens });
  } catch (error) {
    console.error(`Error fetching  token data for admin ${username}:`, error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//5
export const getAllTokenRequestsForAdminGraph = async (req, res) => {
  const { username } = req.params;

  try {
    const sellTokenAggregation = SellTokenModel.aggregate([
      {
        $match: {
          purchaserName: username,
          transactionStatus: "Approved",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$SellTokendateTimeField",
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const buyTokenAggregation = BuyTokenModel.aggregate([
      {
        $match: {
          serviceProviderName: username,
          status: "Approved",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$dateTimeField" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const [sellTransactionsPerDay, buyTransactionsPerDay] = await Promise.all([
      sellTokenAggregation,
      buyTokenAggregation,
    ]);

    return res
      .status(200)
      .json({ sellTransactionsPerDay, buyTransactionsPerDay });
  } catch (error) {
    console.error(`Error fetching token data for admin ${username}:`, error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* __________________________________UserDahboard ________________________________*/

export const getAllTokenForUserDashboard = async (req, res) => {
  const { userId } = req.params;

  try {
    const sellTokenPromise = SellTokenModel.find({
      seller: userId,
    })
      .sort({
        SellTokendateTimeField: -1,
      })
      .populate("seller", ["username", "email"]);

    const buyTokenPromise = BuyTokenModel.find({
      buyer: userId,
    })
      .sort({
        dateTimeField: -1,
      })
      .populate("buyer", ["username", "email"]);

    const [sellTokens, buyTokens] = await Promise.all([
      sellTokenPromise,
      buyTokenPromise,
    ]);

    return res.status(200).json({ sellTokens, buyTokens });
  } catch (error) {
    console.error(`Error fetching  token data :`, error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export async function filterMerchants(req, res) {
  // queryParm   partialUsername
  //show only those merchants jin ka meta mask wallet or bank details ho complete later staege pr add krna yh

  try {
    const { partialUsername } = req.query;
    if (!partialUsername) {
      return res.status(200).json('');
    }
    const regex = new RegExp(`^${partialUsername}.*`, 'i');
    const users =
     await UserModel.find({  username: regex,
      isMerchant: true }).select('username');
    if (!users || users.length === 0) {
      return res.status(200).json('');
    }
    // Extracting only usernames from user objects
    const usernames = users.map(user => user.username);
    return res.status(200).json(usernames);
  } catch (error) {
    console.error("Error filtering merchants:", error);
    return res.status(500).json({ message: "Error searching for merchants", error: error.message });
  }
};

