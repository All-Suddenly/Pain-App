import { IncomingMessage } from 'http';

import {
  CreateSmtpEmail,
  SendSmtpEmail,
  TransactionalEmailsApi,
} from 'sib-api-v3-typescript';

import { config } from '../../config';

import { createEmailClient } from './createEmailClient';
import { TEMPLATES_IDS } from './templateEnum';

export async function sendEmail(
  email: SendSmtpEmail,
  client: TransactionalEmailsApi = createEmailClient(),
): Promise<{
  response: IncomingMessage;
  body: CreateSmtpEmail;
}> {
  // eslint-disable-next-line no-constant-condition
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
