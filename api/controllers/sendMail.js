const nodemailer = require('nodemailer');

const sendMail = async(email, Reset_id)=> {
    // connect with smtp; 
    const transporter = await nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        auth: {
            user: 'hotelio43@outlook.com',
            pass: 'owner_hotelio_43'
        }
    });
    
    let mailDetails = {
        from: 'hotelio43@outlook.com',
        to: `${email}`,
        subject: 'Reset Password',
        text: `Click on the below to Reset Your Password :- 
        https://hotel-booking-frontend-zeta.vercel.app/ResetPassword/?id=${Reset_id}`,
    };
    
    transporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
            
        } else {
            console.log('Email sent successfully');
        }
    });
}

module.exports = {
    sendMail: sendMail
}