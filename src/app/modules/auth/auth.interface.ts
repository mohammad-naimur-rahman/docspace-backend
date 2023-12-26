export interface ISignupUser {
  fullName: string
  email: string
}

export interface ILoginUser {
  email: string
}

export interface IAuthUser {
  user: {
    _id: string
    fullName: string
    email: string
    role: string
  }
  token: {
    accessToken: string
    refreshToken: string
  }
}

export interface IRefreshTokenResponse {
  accessToken: string
}
