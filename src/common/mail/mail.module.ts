import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { existsSync } from "fs";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        const templatePath = join(__dirname, "templates", "staff_confirm.hbs");
        if (!existsSync(templatePath)) {
          console.error(`Template file not found at: ${templatePath}`);
        }
        return {
          transport: {
            host: config.get<string>("SMTP_HOST"),
            secure: false,
            auth: {
              user: config.get<string>("SMTP_USER"),
              pass: config.get<string>("SMTP_PASSWORD"),
            },
          },
          defaults: {
            from: `Pitstop Service Center <${config.get<string>("SMTP_USER")}>`,
          },
          template: {
            dir: join(__dirname, "templates"),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
