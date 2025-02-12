import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { Person } from "@prisma/client";

interface IAuthenticatePersonRequest {
    email: string;
    password: string
}

interface IAuthenticatePersonResponse {
    person: Person
}

export class AuthenticatePersonService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute(authenticatePersonData: IAuthenticatePersonRequest): Promise<IAuthenticatePersonResponse> {
        const person = await this.personsRepository.findPersonByEmail(authenticatePersonData.email);

        if (!person) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(authenticatePersonData.password, person.password);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return { person };

    }

}