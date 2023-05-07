export interface CompanyI {
  name: string;
  rfc: string;
  clientId: number;
  zipCode: number;
  neighborhood: string;
  street: string;
  number: number;
  city: string;
  country: string;
  state: string;
  taxSystem: string;
  status?: boolean;
  alias: string;
  photo?: string;
}
