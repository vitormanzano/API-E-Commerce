import { Person } from "@prisma/client";
import { IPersonsRepository } from "../../../repositories/persons-repository-interface";
import { InvalidCredentialsError } from "../../../errors/invalid-credentials-error";

interface IDeletePersonByGuidRequest {
    guid: string
}

interface IDeletePersonByGuidResponse {
    person: Person;
}

export class DeletePersonByGuidService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute({guid}: IDeletePersonByGuidRequest): Promise<IDeletePersonByGuidResponse> {
        const person = await this.personsRepository.deletePersonByGuid(guid);

        if (!person) {
            throw new InvalidCredentialsError(); 
        }

        return {
            person
        }
    }
}