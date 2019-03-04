const nodemailer = require('nodemailer');

function sendMail(order) {  
  
  return new Promise((resolve, reject) => {
    // send mail with defined transport object
    let transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'mail', // mail user who sends email
        pass: 'password' // mail user password who sends email
      },
      // tls: {
      //   rejectUnauthorized: false
      // }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Logo Planet robot" <svinnet92@mail.ru>', // sender address
      to: "svinnet92@mail.ru", // list of receivers
      subject: "Заявка от " + order.name, // Subject line
      text: "Новая заявка", // plain text body
      html: "<ul><li>Имя: "+order.name+"</li><li>Телефон: "+order.phone+"</li><li>Дата заявки: "+order.date+"</li><li>Checkbox-1: "+order.firstCB+"</li><li>Checkbox-2: "+order.secondCB+"</li><li>Checkbox-3: "+order.thirdCB+"</li></ul>" // html body
    };
  
    let result;
    transporter.sendMail(mailOptions, function(err, info){
      if (err) {
        result = false;
        console.log(err);
        reject(result);
      } else {
        result = true;
        console.log('Message sent: ', info.messageId);
        resolve(result);
      }
    });
  })
}

module.exports = sendMail;
