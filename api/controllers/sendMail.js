const nodemailer = require('nodemailer');

const sendMail = async(email, Reset_id)=> {
    // connect with smtp; 
    const transporter = await nodemailer.createTransport({
        host: 'smtp.elasticemail.com',
        port: 2525,
        auth: {
            user: 'hotelio43@gmail.com',
            pass: 'B33EE27E24F25ED14A84EE08CF3E50B4DF8E'
        }
    });
    
    let mailDetails = {
        from: 'hotelio43@gmail.com',
        to: `${email}`,
        subject: 'Reset Password',
        text: `Click on the below to Reset Your Password :- 
        http://localhost:3000/ResetPassword/?id=${Reset_id}`,
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