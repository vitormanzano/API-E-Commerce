import { IPersonsRepository } from "@/repositories/persons-repository-interface";

interface IUpdatePersonRequest {
    email?: string,
    name?: string,
    password?: string,
    latitude?: number,
    longitude?: number
}


export class  UpdatePersonService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute(guid: string, person: IUpdatePersonRequest) {
        const updatedPerson = await this.personsRepository.updatePersonByGuid(guid, person)

        return { updatedPerson }
    }
}