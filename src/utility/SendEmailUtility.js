const nodemailer = require("nodemailer");

const SendEmailUtility=async(EmailTo,EmailText,EmailSubject)=>{
    const transporter = nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port:25,
        secure:false,
        auth: {
          user: 'info@teamrabbil.com',
          pass: '~sR4[bhaC[Qs'
        },tls:{
            rejectUnauthorized:false
        }
      });

      const mailOption={
        from: 'info@teamrabbil.com', 
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
      }

      return await transporter.sendMail(mailOption)
}

module.exports=SendEmailUtility