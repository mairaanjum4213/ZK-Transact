import { Router } from 'express';
/** import all controllers */
import * as controller from '../controllers/appController.js';
import Auth, { localVariables } from '../middleware/auth.js';
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
router.route('/buyToken').post(controller.buyToken);
/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser,localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables

/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile,, 
//                                                          first call Auth middleware to verify the jwt token only valid login user can update
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword); // use to reset password

/*router.get('/verifyaccount', async (req, res) => {
    try {
      const { username } = req.query;
  
      // Find the user by username in the database
      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(404).send('User not found'); // If user not found, handle appropriately
      }
  
      // Update the user's account status to 'verified' (Assuming you have a 'verified' field in your schema)
      user.verified = true; // Set the 'verified' field to true or update any other field as needed
      await user.save(); // Save the updated user
  
      res.send(`Account for username ${username} has been verified successfully!`);
    } catch (error) {
      console.error('Error occurred during account verification:', error);
      res.status(500).send('Error occurred during account verification');
    }
  });*/
export default router;
