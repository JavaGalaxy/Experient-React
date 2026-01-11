export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface ParsedName {
  title: string;
  firstName: string;
  middleParts: string[];
  lastName: string;
  suffix: string | undefined;
}

export interface FormattedUser {
  id: number;
  displayName: string;
  originalUser: User;
}
