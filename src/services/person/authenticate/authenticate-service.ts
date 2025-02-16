import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { Person } from "@prisma/client";

interface IAuthenticatePersonServiceRequest {
    email: string;
    password: string
}

interface IAuthenticatePersonServiceResponse {
    person: Person
}

export class AuthenticatePersonService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute(authenticatePersonData: IAuthenticatePersonServiceRequest): Promise<IAuthenticatePersonServiceResponse> {
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