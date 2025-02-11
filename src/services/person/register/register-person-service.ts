import { Person } from "@prisma/client";
import { IPersonsRepository } from "../../../repositories/persons-repository-interface";
import { hash } from "bcryptjs";
import { PersonAlreadyExistsError } from "../../../errors/person-already-exists-error";

export interface IRegisterPersonServiceRequest {
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
        const hasExistPerson = await this.personsRepository.findPersonByEmail(personData.email);

        if (hasExistPerson) {
            throw new PersonAlreadyExistsError();
        }

        if ( personData.password.length < 6) {
            throw new Error('Password not be able to be fewer than 6 characters');
        }

        const hashedPassword = await hash(personData.password, 6);
        personData.password = hashedPassword;

        const person = await this.personsRepository.registerPerson(personData);

        return { person }; 
    }
}
