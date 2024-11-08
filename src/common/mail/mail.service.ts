import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Client, Staff } from "@prisma/client";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendStaffConfirmationMail(staff: Staff) {
    const url = `${process.env.API_URL}:${process.env.API_PORT}/api/staff/activate/${staff.activation_link}`;

    // i can modify this for others.
    const managerEmail = "xzero1118@example.com"; // shu yerga email jo'natiladi.

    try {
      await this.mailerService.sendMail({
        to: managerEmail,
        subject: "Pitstop Member Account Activation",
        template: "./staff_confirm", // path hbs fayl bilan to'g'ri bo'lishi kerak.
        context: {
          full_name: staff.fullname,
          activation_link: url,
        },
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Email could not be sent");
    }
  }

  async sendClientConfirmationMail(client: Client) {
    const url = `${process.env.API_URL}:${process.env.API_PORT}/api/client/activate/${client.activation_link}`;

    try {
      await this.mailerService.sendMail({
        to: client.email,
        subject: "Welcome to Pitstop! Confirm Your Account",
        template: "./client_confirm",
        context: {
          full_name: `${client.first_name} ${client.last_name}`,
          activation_link: url,
        },
      });
    } catch (error) {
      console.error("Error sending client email:", error);
      throw new Error("Email could not be sent");
    }
  }
}
