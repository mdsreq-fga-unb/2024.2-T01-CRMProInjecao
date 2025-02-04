import { Logger, Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";

@Module({
  providers: [EmailService, Logger],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
