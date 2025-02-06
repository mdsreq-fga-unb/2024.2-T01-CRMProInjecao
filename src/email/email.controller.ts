import { Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";
import { Public } from "../auth/public.decorator";

@Controller("email")
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Public()
  @Post()
  sendTestEmail() {
    return this.emailService.sendEmail({
      context: {
        title: "Teste",
        message: "Teste"
      },
      sendTo: "vnca00@gmail.com",
      subject: "Teste",
      template: "simpleEmail",
    });
  }
}
