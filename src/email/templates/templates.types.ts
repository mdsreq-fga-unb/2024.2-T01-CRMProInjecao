import type { ISendMailOptions } from "@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface.d.ts";

export type AvailableTemplates = "simpleEmail"

export type SendMailBaseOptions = {
  sendTo: ISendMailOptions["to"];
  from?: string;
  subject: string;
  template: AvailableTemplates;
  context: string | object | undefined;
};


export type SimpleEmailTemplate = Omit<SendMailBaseOptions, "context"> & {
  template: "simpleEmail";
  context: {
    title: string;
    message: string;
  };
};
