import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { IDeletePersonByGuidServiceRequest } from "./models/IDeletePersonServiceRequest";
import { IDeletePersonByGuidServiceResponse } from "./models/IDeletePersonServiceResponse";

export class DeletePersonByGuidService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute(user: IDeletePersonByGuidServiceRequest): Promise<IDeletePersonByGuidServiceResponse> {
        const person = await this.personsRepository.deletePersonByGuid(user.guid);

        if (!person) {
            throw new InvalidCredentialsError(); 
        }

        return {
            person
        }
    }
}