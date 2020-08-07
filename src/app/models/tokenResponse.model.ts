export interface TokenResponse {
    readonly expiresIn: string,
    readonly accessToken: string,
    readonly userId: string,
    readonly status: number
}
