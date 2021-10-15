import { IncomingMessage } from 'http';

import {
  CreateSmtpEmail,
  SendSmtpEmail,
  SendSmtpEmailTo,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from 'sib-api-v3-typescript';

import { config } from '../../config';

import { TEMPLATES_IDS } from './templateEnum';

function createEmailClient() {
  const apiInstance = new TransactionalEmailsApi();

  apiInstance.setApiKey(
    TransactionalEmailsApiApiKeys.apiKey,
    config.email.apiKey,
  );

  return apiInstance;
}

export function createTemplateEmail(
  templateId: TEMPLATES_IDS,
  to?: SendSmtpEmailTo[],
  params?: Record<string, unknown>,
) {
  const sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.templateId = templateId;
  sendSmtpEmail.sender = config.email.sender;
  sendSmtpEmail.to = to;
  sendSmtpEmail.params = params;

  return sendSmtpEmail;
}

export async function sendEmail(
  email: SendSmtpEmail,
  client: TransactionalEmailsApi = createEmailClient(),
): Promise<{
  response: IncomingMessage;
  body: CreateSmtpEmail;
}> {
  if (config.env.isProduction) {
    return client.sendTransacEmail(email);
  } else {
    // For debugging locally
    (email as any)._templateName = TEMPLATES_IDS[1].toString();
    console.log('Fake Email Sent: ', email);

    return Promise.resolve({
      body: {
        messageId: 'not-in-production-email-not-sent',
        messageIds: undefined,
      } as CreateSmtpEmail,
      response: {
        ...new IncomingMessage({} as any),
        complete: true,
        statusCode: 201,
        statusMessage: 'Created',
      } as IncomingMessage,
    });
  }
}

// For testing
// ------------
// async function main() {
//   const client = createEmailClient();
//   const email = createTemplateEmail(
//     TEMPLATES_IDS.CONFIRMATION,
//     [{ email: 'davidclausen2051@gmail.com' }],
//     {
//       NAME: 'David Clausen',
//       TOKEN: 'g1b3r1sh-12324-abcde',
//       URL: 'http://localhost:3000/account/confirm?token=',
//     },
//   );

//   return sendEmail(email, client);
// }

// main()
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));
