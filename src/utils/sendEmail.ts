import nodemailer, { Transporter } from "nodemailer";

export class SendMail {
  toEmail: string;
  activationCode: string;
  transporter: Transporter;
  constructor(to: string, activationCode: string) {
    this.toEmail = to;
    this.activationCode = activationCode;
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail() {
    await this.transporter.sendMail({
      from: `${process.env.FROM_EMAIL}`,
      to: this.toEmail,
      subject: "Подтверждение аккаунта",
      html: `
	    <p>Для подтверждения вашего аккаунта введите код ниже:</p>
      <hr/>
      <h1>${this.activationCode}</h1>
	  `,
    });
  }
}
