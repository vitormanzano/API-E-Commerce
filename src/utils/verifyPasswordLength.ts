import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

export function verifyPasswordLength(password: string) {
    if (password.length < 6) {
        throw new InvalidCredentialsError
    }
}