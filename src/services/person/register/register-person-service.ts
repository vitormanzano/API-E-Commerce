import { Person } from "@prisma/client";
import { IPersonsRepository } from "../../../repositories/persons-repository-interface";
import { hash } from "bcryptjs";

export interface IRegisterPersonServiceRequest {
    guid: string;
    name: string;
    email: string;
    password: string;
    latitude: number;
    longitude: number;
}

interface IRegisterPersonServiceResponse {
    person: Person; 
}

export class RegisterPersonService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute(personData: IRegisterPersonServiceRequest): Promise<IRegisterPersonServiceResponse> {
        const hashedPassword = await hash(personData.password, 6);
        personData.password = hashedPassword;

        const person = await this.personsRepository.registerPerson(personData);

        return { person }; 
    }
}
