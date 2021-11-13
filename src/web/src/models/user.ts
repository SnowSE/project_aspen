export interface User {
  access_token: string,
  profile: {
    roles: string[],
    email: string
  }
}