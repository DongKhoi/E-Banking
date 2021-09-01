let controller = {};
const nodeMailer = require('nodemailer')



controller.sendMail = async (options) => {
  
  const adminEmail = 'thanhnhan02677@gmail.com'
  const adminPassword = 'thanhnhan02677@gmail'
  //   // sử dụng host của google - gmail
  const mailHost = 'smtp.gmail.com'
  //   // 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
  const mailPort = 587
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  });
 return await transporter.sendMail(options);
 
   
};

module.exports = controller;
