export type TFormFields = {
  firstName: string;
  lastName: string;
  email?: string;
  mobilePrefix?: string;
  mobile?: string;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
};

export type TQuoteResponse = {
  CustomerRate: number;
  CustomerAmount: number;
};

export type TErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  fromCurrency?: string;
  toCurrency?: string;
  amount?: string;
};
