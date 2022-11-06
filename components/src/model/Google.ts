export type GoogleSessionType = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
};

export const googleSessionInit = {
  aud: '',
  azp: '',
  email: '',
  email_verified: false,
  exp: 0,
  family_name: '',
  given_name: '',
  iat: 0,
  iss: '',
  jti: '',
  name: '',
  nbf: 0,
  picture: '',
  sub: '',
};
