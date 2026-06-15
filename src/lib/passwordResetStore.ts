export const passwordResetStore = new Map<
  string,
  {
    otp: string
    expiresAt: number
  }
>()
