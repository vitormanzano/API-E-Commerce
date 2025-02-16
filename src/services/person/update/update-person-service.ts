import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { Person } from "@prisma/client";

interface IUpdatePersonServiceRequest {
    email?: string,
    name?: string,
    password?: string,
    latitude?: number,
    longitude?: number
}

interface IUpdatePersonServiceResponse {
    updatedPerson: Person;
}

export class UpdatePersonService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute(guid: string, person: IUpdatePersonServiceRequest): Promise<IUpdatePersonServiceResponse> {
        const updatedPerson = await this.personsRepository.updatePersonByGuid(guid, person)
        
        if (!updatedPerson) {
            throw new InvalidCredentialsError()
        }

        return { updatedPerson } 
    }
}