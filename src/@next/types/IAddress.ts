export interface IAddress {
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  province?: string;
  amphoe?: string;
  district?: any;
  postalCode?: string;
  countryArea?: string;
  phone?: any | null;
  country?: {
    code?: string;
    country?: string;
  };
}
