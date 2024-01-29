import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';

// Nodemailer configuration
let nodeConfig = {
    service: 'gmail',
    auth: {
        user: ENV.EMAIL, 
        pass: ENV.PASSWORD, 
    }
};

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
export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    var email = {
        body: {
            name: username,
            intro: `Dear ${username},`,
            table: {
                data: [
                    {                
                        Welcome: `Hello ${username}! Welcome to ZK-Transact, where secure transactions meet convenience.`
                    },
                
                ],
                columns: {
                    customWidth: {
                        
                        Welcome: '100%'
                    }
                }
            },
            outro: 'Thank you for using ZK-Transact. For any queries or assistance, please contact our support team.'
        }
    };

    var emailBody = MailGenerator.generate(email);

    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || 'Signup Successful',
        html: emailBody
    };

    try {
        await transporter.sendMail(message);
        return res.status(200).send({ success: true, message: 'A welcome email has been sent. Please check your inbox!' });
    } catch (error) {
        return res.status(500).send({ success: false, message: 'Failed to send the email. Please try again later.', error });
    }
};
