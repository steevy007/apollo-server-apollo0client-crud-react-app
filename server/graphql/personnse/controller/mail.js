const nodemailer=require('nodemailer')
const dotenv=require('dotenv').config()
const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.GMAIL_ACCOUNT,
        pass:process.env.GMAIL_PASSWORD
    },
    tls:{
        rejectUnauthorized:false
    }
})
const sendMail=async(fullname,object,email,message)=>{
    const textMessage=`Vous avez recu un message de ${fullname} le contenu du message est la suivante : ${message}`
    const res=await transporter.sendMail({
        from:process.env.GMAIL_ACCOUNT,
        to:email,
        subject:object,
        text:textMessage
    })

    return true
}

module.exports={sendMail}