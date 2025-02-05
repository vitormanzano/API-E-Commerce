import { Person } from "@prisma/client";
import { IPersonsRepository } from "../../../repositories/persons-repository-interface";
import { InvalidCredentialsError } from "../../../errors/invalid-credentials-error";

export class DeletePersonByGuidService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute(guid: string): Promise<Person> {
        const hasExistPerson = await this.personsRepository.deletePersonByGuid(guid);

        if (!hasExistPerson) {
            throw new InvalidCredentialsError(); 
        }

        return hasExistPerson
    }
}