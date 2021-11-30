import { SendSmtpEmail, SendSmtpEmailTo } from 'sib-api-v3-typescript';

import { config } from '../../config';

import { TEMPLATES_IDS } from './templateEnum';

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
