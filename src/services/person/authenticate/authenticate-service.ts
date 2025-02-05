import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../../../errors/invalid-credentials-error";
import { IAuthenticatePersonModel } from "../../../models/authenticate-person-model";
import { IPersonsRepository } from "../../../repositories/persons-repository-interface";

export class AuthenticatePersonService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute(authenticatePersonData: IAuthenticatePersonModel) {
        const person = await this.personsRepository.findPersonByEmail(authenticatePersonData.email);

        if (!person) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(authenticatePersonData.password, person.password);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return person.guid;

    }

}