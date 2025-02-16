import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IAuthenticatePersonServiceRequest } from "./models/IAuthenticatePersonServiceRequest";
import { IAuthenticatePersonServiceResponse } from "./models/IAuthenticatePersonServiceResponse";

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