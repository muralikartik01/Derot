export type AuthMode = 'login' | 'signup'

export type AuthPayload = {
  email: string
  password: string
  firstName?: string
  lastName?: string
}
