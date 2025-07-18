import { Router } from 'express';
/** import all controllers */
import * as controller from '../controllers/appController.js';
import * as chatController from '../controllers/ChatController.js';
import * as messageController from '../controllers/MessageController.js';
import Auth, { localVariables } from '../middleware/auth.js';
import upload from "../middleware/upload.js"
import uploads from "../middleware/upload2.js"
import { registerMail } from '../controllers/mailer.js'
import { registerMail2 } from '../controllers/mailer2.js'
const router = Router();

/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email when user register and send otp from the mail
router.route('/registerMail2').post(registerMail2); // send the email when user register and send otp from the mail
router.route('/authenticate').post(controller.verifyUser,(req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app first verify user then loginnn thats why 2 controllers
router.route('/sellToken').post(controller.sellToken);
router.route('/buyToken').post(upload.single('buyReceipt'),controller.buyToken);
router.route('/transferToken').post(controller.transferToken);

/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser,localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP) // verify generated OTP
router.route('/getUserById/:id').get(controller.getUserById) 
router.route('/getAllUsers').get(controller.getAllUsers)
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables
router.route('/getbuytokens').get(controller.userwithBuyToken) 
router.route('/getselltokens').get(controller.userwithSellToken) 
router.route('/userwithselltoken/:sellTokenId').get(controller.userwithSellTokenwithId);
router.route('/userwithbuytoken/:buyTokenId').get(controller.userwithBuyTokenwithId);
router.route('/gettransfertokens/sender/:senderId').get(controller.userwithTransferToken)
router.route('/getalltransfertokens/sender/:senderId').get(controller.getAllTransferTokens)

/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile,, 
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword); // use to reset password




/*________________________Chat Routes____________________________*/

router.route('/createChat').post(chatController.createChat);
router.route('/getChats/:userId').get(chatController.userChats);
router.route('/find/:firstId/:secondId').get(chatController.findChat);


/*_______________________Message Routes ________________________*/
router.route('/addMessage').post(messageController.addMessage);
router.route('/getMessages/:chatId').get(messageController.getMessages);


/*___________________Merchant Route ____________________*/
router.route('/becomeMerchant').post(controller.becomeMerchant);
router.route('/merchant/fee').put(controller.updateFee);
router.route('/getMerchants').get(controller.getMerchants);
router.route('/getMerchant').get(controller.getSpecificMerchant);
router.route('/filterMerchants').get(controller.filterMerchants);

/*___________________Account Route ____________________*/
router.route('/accounts').post(controller.createAccountDetails);
router.route('/users/:userId/accounts/:accountId').put(controller.assignAccountToUser);


/*______________________Wallet Routes ______________________*/
router.route('/wallet').post(controller.createWalletDetails);
router.route('/users/:userId/wallet/:walletId').put(controller.assignWalletToUser);



/*______________________Sell Request Routes ______________________*/
router.route('/sellToken/approve/:id').put(controller.approveSellToken);
router.route('/sellToken/approved/:id').put(controller.approveSellTokenByAdmin);
router.route('/sellToken/reject/:id').put(controller.rejectSellTokenByAdmin);
router.route('/sellToken/pending/:username').get(controller.getPendingSellTokenRequestsForAdmin);
router.route('/sellToken/approved/:username').get(controller.getApprovedSellTokenRequestsForAdmin);
router.route('/sellToken/seller/:sellerId').get(controller.getApprovedSellTokenRequestsForUser);


/*______________________Buy Request Routes ______________________*/
router.route('/buyToken/approve/:id').put(controller.approveBuyToken);
router.route('/buyToken/approved/:id').put(controller.approveBuyTokenByAdmin);
router.route('/buyToken/reject/:id').put(controller.rejectBuyTokenByAdmin);
router.route('/buyToken/pending/:username').get(controller.getPendingBuyTokenRequestsForAdmin);
router.route('/buyToken/approved/:username').get(controller.getApprovedBuyTokenRequestsForAdmin);
router.route('/buyToken/buyer/:buyerId').get(controller.getApprovedBuyTokenRequestsForUser);

/*___________________________Dashboard __________________*/
router.route('/buysell/approved/:username').get(controller.getApprovedTokenRequestsForAdmin);
router.route('/buysell/allreq/:username').get(controller.getTokenRequestsCountForAdmin);
router.route('/buysell/recentapproved/:username').get(controller.getRecentApprovedTokenRequestsForAdmin);
router.route('/buysell/all/:username').get(controller.getAllTokenRequestsForAdmin);
router.route('/buysell/allgraph/:username').get(controller.getAllTokenRequestsForAdminGraph);


/*________________User Dashboard __________________*/
router.route('/buysell/buyerseller/:userId').get(controller.getAllTokenForUserDashboard);


/*_________________________________KYC _________________________*/
router.route('/postkyc').post(uploads.single('nationalIdentity'),controller.postKYC);
router.route('/getkyc').get(controller.getAllKYC);
router.route('/admin/pending-kyc-requests').get(controller.getPendingKYCRequestsForAdmin);
router.route('/admin/reject-kyc/:id').put(controller.rejectKYCByAdmin);
router.route('/admin/approve-kyc/:id').put(controller.approveKYCByAdmin);
router.route('/users/update-kyc-status/:userId').put(controller.updateUserKYCStatus);

export default router;
