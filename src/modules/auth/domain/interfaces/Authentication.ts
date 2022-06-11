export type ValidateResponseRetry = {
  status: 'retry';
};

export type ValidateResponseKO = {
  status: 'unauthorized';
};

export type ValidateResponseOk = {
  status: 'success';
  // 👇 TO DO - This should be a user domain entity from the proper module
  user: Record<string, never>;
};

export type ValidateResponse = ValidateResponseRetry | ValidateResponseKO | ValidateResponseOk;

export interface Authentication {
  validate: (barearToken?: string) => Promise<ValidateResponse>;
}
