import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from 'sib-api-v3-typescript';

import { config } from '../../config';

export function createEmailClient() {
  const apiInstance = new TransactionalEmailsApi();

  apiInstance.setApiKey(
    TransactionalEmailsApiApiKeys.apiKey,
    config.email.apiKey,
  );

  return apiInstance;
}
