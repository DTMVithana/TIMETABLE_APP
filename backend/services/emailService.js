const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "kavi.fernando2001@gmail.com",
        pass: "kqxf xzjl nykr hcdn", // app-specific password
      },
    });
  }

  async sendEmail(to, subject, text) {
    try {
      await this.transporter.sendMail({
        from: "kavi.fernando2001@gmail.com", // Replace with your Gmail email address
        to,
        subject,
        text,
      });
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

module.exports = EmailService;
