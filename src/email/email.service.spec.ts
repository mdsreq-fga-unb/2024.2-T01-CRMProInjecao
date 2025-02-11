import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SimpleEmailTemplate } from './templates/templates.types';

describe('EmailService', () => {
  let service: EmailService;
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
    mailerService = module.get(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send an email successfully with simple template', async () => {
      const emailData: SimpleEmailTemplate = {
        sendTo: 'test@example.com',
        subject: 'Test Subject',
        template: 'simpleEmail',
        context: {
          title: 'Test Title',
          message: 'Test Message',
        },
      };

      const result = await service.sendEmail(emailData);

      expect(result).toEqual({ send: true });
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: emailData.sendTo,
        from: 'CRM-PROINJECAO <contato@casapiri.com.br>',
        subject: emailData.subject,
        template: emailData.template,
        context: emailData.context,
      });
    });

    it('should handle errors when sending email fails', async () => {
      const error = new Error('Failed to send email');
      mockMailerService.sendMail.mockRejectedValueOnce(error);

      const emailData: SimpleEmailTemplate = {
        sendTo: 'test@example.com',
        subject: 'Test Subject',
        template: 'simpleEmail',
        context: {
          title: 'Test Title',
          message: 'Test Message',
        },
      };

      const result = await service.sendEmail(emailData);

      expect(result).toEqual({
        send: false,
        error: error.message,
      });
    });

    it('should log email data when EMAIL_DISABLED is true', async () => {
      const originalEnv = process.env.EMAIL_DISABLED;
      process.env.EMAIL_DISABLED = 'true';

      const emailData: SimpleEmailTemplate = {
        sendTo: 'test@example.com',
        subject: 'Test Subject',
        template: 'simpleEmail',
        context: {
          title: 'Test Title',
          message: 'Test Message',
        },
      };

      const debugSpy = jest.spyOn(Logger.prototype, 'debug');

      const result = await service.sendEmail(emailData);

      expect(result).toEqual({ send: true });
      expect(debugSpy).toHaveBeenCalled();
      expect(mailerService.sendMail).not.toHaveBeenCalled();

      process.env.EMAIL_DISABLED = originalEnv;
    });
  });
});
