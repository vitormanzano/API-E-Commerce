import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { IGetProfileServiceRequest } from "./models/IGetProfileServiceRequest";
import { IGetProfileServiceResponse } from "./models/IGetProfileServiceResponse";

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