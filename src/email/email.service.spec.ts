import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

describe('EmailService', () => {
  let service: EmailService;
  let logger: Logger;
  let mailerService: jest.Mocked<MailerService>;

  const mockMailerService = {
    sendMail: jest.fn().mockResolvedValue({ send: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        Logger,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    logger = module.get<Logger>(Logger);
    mailerService = module.get(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // // Add a test for sending email
  // it("should send an email successfully", async () => {
  //   const emailData = {
  //     sendTo: "test@example.com",
  //     subject: "Test Subject",
  //     template: "test-template",
  //     context: { name: "Test User" }
  //   };

  //   const result = await service.sendEmail(emailData);
  //   expect(result).toEqual({ send: true });
  //   expect(mailerService.sendMail).toHaveBeenCalled();
  // });
});
