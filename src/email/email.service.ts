import { MailerService } from "@nestjs-modules/mailer";
import type { ISendMailOptions } from "@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface.d.ts";
import { Injectable, Logger } from "@nestjs/common";
import {
  SendMailBaseOptions,
  SimpleEmailTemplate,
} from "./templates/templates.types";

type SendEmailResponse = { send: boolean; error?: string };
@Injectable()
export class EmailService {
  private devLogger = new Logger(EmailService.name);
  constructor(private mailerService: MailerService) {}

  async sendEmail({
    context,
    sendTo,
    subject,
    template,
  }: SimpleEmailTemplate): Promise<SendEmailResponse>;
  async sendEmail({
    context,
    sendTo,
    subject,
    template,
  }: SendMailBaseOptions): Promise<SendEmailResponse> {
    try {
      let sendMailOptions: ISendMailOptions = {};


      sendMailOptions = {
        to: sendTo,
        from: "CRM-PROINJECAO <contato@casapiri.com.br>",
        subject: subject,
        template: template,
        context: context as object,
      };

      if (process.env.EMAIL_DISABLED === "true") {
        this.devLogger.debug(sendMailOptions);
      } else {
        await this.mailerService.sendMail(sendMailOptions);
      }

      return { send: true };
    } catch (error) {
      this.devLogger.error(error);

      return {
        send: false,
        error: error.message,
      };
    }
  }
}
