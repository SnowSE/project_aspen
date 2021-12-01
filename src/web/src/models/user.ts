export interface User {
  access_token: string,
  profile: {
    roles: string[],
    given_name: string,
    email: string
  }
}