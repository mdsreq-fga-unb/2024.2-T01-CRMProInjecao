import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

describe('EmailController', () => {
  let controller: EmailController;
  let emailService: jest.Mocked<EmailService>;

  const mockEmailService = {
    sendEmail: jest.fn().mockResolvedValue({ send: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
      ],
    }).compile();

    controller = module.get<EmailController>(EmailController);
    emailService = module.get(EmailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendTestEmail', () => {
    it('should send a test email successfully', async () => {
      const expectedEmailData = {
        context: {
          title: 'Teste',
          message: 'Teste',
        },
        sendTo: 'vnca00@gmail.com',
        subject: 'Teste',
        template: 'simpleEmail',
      };

      const result = await controller.sendTestEmail();

      expect(result).toEqual({ send: true });
      expect(emailService.sendEmail).toHaveBeenCalledWith(expectedEmailData);
      expect(emailService.sendEmail).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when sending test email fails', async () => {
      const error = { send: false, error: 'Failed to send email' };
      mockEmailService.sendEmail.mockResolvedValueOnce(error);

      const result = await controller.sendTestEmail();

      expect(result).toEqual(error);
      expect(emailService.sendEmail).toHaveBeenCalledTimes(1);
    });
  });
});
