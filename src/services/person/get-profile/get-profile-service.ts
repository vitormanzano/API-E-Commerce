import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { Person } from "@prisma/client";

interface IGetProfileServiceRequest {
    guid: string
}

interface IGetProfileServiceResponse {
    person: Person
}

export class GetProfileService {
    constructor (private personsRepository: IPersonsRepository) {}

    async execute({guid}: IGetProfileServiceRequest): Promise<IGetProfileServiceResponse>  {
        const person = await this.personsRepository.findPersonByGuid(guid);

        if (!person) {
            throw new ResourceNotFoundError();
        }

        return { person };
    }
}