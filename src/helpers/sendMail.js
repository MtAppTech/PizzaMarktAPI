"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | MTappTech
------------------------------------------------------- */
// Sending E-Mail:
// $ npm i nodemailer

const nodemailer = require("nodemailer");

require("dotenv").config();
const EMAIL_PASS_GOOGLE = process.env.EMAIL_PASS;

//Create Test (Fake) Email Account
//nodemailer.createTestAccount().then((email)=> console.log(email))
/*
{
  user: 'u7wojd7ew54ujjzu@ethereal.email',
  pass: 'huh2391F9wWuQQ26tF',
  smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
  imap: { host: 'imap.ethereal.email', port: 993, secure: true },
  pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
  web: 'https://ethereal.email'
}
*/
// Connect to mail-server:
/*
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true, tls, ssl
  auth: {
    user: 'u7wojd7ew54ujjzu@ethereal.email',
    pass: 'huh2391F9wWuQQ26tF',
  },
});
transporter.sendMail({
  from: 'u7wojd7ew54ujjzu@ethereal.email',
  to: 'mt.app.tech@gmail.com', // 'a@b.com, b@c.com'
  subject: 'Hello',
  // Message:
  text: 'Hello There. How are you?',
  html: '<b>Hello There.</b> <p>How are you?</p>',
}, (error, success) => { 
  error ? console.log('error:', error) : console.log('success:', success)
})
*/

// //? YandexMail (yandex):
// const transporter = nodemailer.createTransport({
//     service: 'Yandex',
//     auth: {
//         user: 'username@yandex.com',
//         pass: 'password' // your emailPassword
//     }
// })
// //? GoogleMail (gmail):
// //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
/*
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mt.app.tech@gmail.com",
    pass: "0000 0000 0000 0000",
  },
});
transporter.sendMail(
  {
    from: "mt.app.tech@gmail.com",
    to: "murat.topal.ankara@gmail.com",
    subject: "Hello",
    text: "Hello There. How are you?",
    html: "<b>Hello There.</b> <p>How are you?</p>",
  },
  (error, success) => {
    error ? console.log("error:", error) : console.log("success:", success);
  }
);
*/


// sendMail(to, subject, message):


module.exports = function (to, subject, message) {
  // Connect to mail-server:
 
   console.log(EMAIL_PASS_GOOGLE)
  //? GoogleMail (gmail):
  //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mt.app.tech@gmail.com",
      pass: EMAIL_PASS_GOOGLE,
    },
  });

  // //? YandexMail (yandex):
  // const transporter = nodemailer.createTransport({
  //     service: 'Yandex',
  //     auth: {
  //         user: 'username@yandex.com',
  //         pass: 'password' // your emailPassword
  //     }
  // })

  transporter.sendMail(
    {
      // from: 'mt.app.tech.com',
      to: to, // 'mt.app.tech',
      subject: subject, // 'Hello',
      text: message, // 'Hello There. How are you?',
      html: message, // '<b>Hello There.</b> <p>How are you?</p>',
    },
    (error, success) => {
      error ? console.log("error:", error) : console.log("success:", success);
    }
  );
};
