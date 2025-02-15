import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";

export class GetProfileService {
    constructor (private personsRepository: IPersonsRepository) {}

    async execute(guid: string) {
        const person = await this.personsRepository.findPersonByGuid(guid);

        return { person };
    }
}