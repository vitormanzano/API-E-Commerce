import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { Person } from "@prisma/client";

interface IUpdatePersonServiceRequest {
    personGuid: string,
    fieldToUpdate: string,
    valueToUpdate: any,
}

interface IUpdatePersonServiceResponse {
    updatedPerson: Person;
}

export class UpdatePersonService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute({personGuid, fieldToUpdate, valueToUpdate}: IUpdatePersonServiceRequest): Promise<IUpdatePersonServiceResponse> {
        const updatedPerson = await this.personsRepository.updatePersonByGuid(personGuid, fieldToUpdate, valueToUpdate)
        
        if (!updatedPerson) {
            throw new InvalidCredentialsError()
        }

        return { updatedPerson } 
    }
}