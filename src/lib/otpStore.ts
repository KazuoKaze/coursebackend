export const otpStore = new Map<
  string,
  {
    otp: string
    name: string
    password: string
    expiresAt: number
  }
>()
