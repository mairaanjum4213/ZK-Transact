import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';

// https://ethereal.email/create
let nodeConfig = {
    service: 'gmail',
    auth: {
        user: ENV.EMAIL, 
        pass: ENV.PASSWORD, 
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: {
        // Customizing colors and styles
        palette: {
            primary: '#0048BA', // Blue color
            secondary: '#005792' // Darker Blue color
            // You can add more color variations as needed
        },
        fontFamily: 'Arial, sans-serif',
        // Custom styles for different components
        table: {
            body: {
                cellPadding: 5,
                cellBorder: '1px solid #ddd'
            }
        }
    },
    product: {
        // Ensure the product object is provided
        name: 'ZK-Transact',
        link: 'https://zktransact.com/'
    }
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123@gmail.com",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail2 = async (req, res) => {
    try {
        const { username, userEmail, otp, subject } = req.body;

        var email = {
        body: {
            name: username,
            intro: `Dear ${username},`,
            table: {
                data: [
                    {                
                        OTP: `Hello ${username}! Here is you OTP ${otp}.`
                    },
                
                ],
                columns: {
                    customWidth: {
                        
                        OTP: '100%'
                    }
                }
            },
            outro: 'Thank you for using ZK-Transact. For any queries or assistance, please contact our support team.'
        }
    };


        const emailBody = MailGenerator.generate(email);

        const message = {
            from: ENV.EMAIL, // Your Gmail email address
            to: userEmail,
            subject: subject || 'OTP for Password Recovery',
            html: emailBody
        };

        await transporter.sendMail(message);

        return res.status(200).send({
            success: true,
            message: 'An email with the OTP has been sent. Please check your inbox!'
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to send the email. Please try again later.',
            error: error.message || 'Unknown error'
        });
    }
};
