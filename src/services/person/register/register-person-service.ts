import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { hash } from "bcryptjs";
import { PersonAlreadyExistsError } from "@/errors/person-already-exists-error";
import { IRegisterPersonServiceRequest } from "./models/IRegisterPersonServiceRequest";
import { IRegisterPersonServiceResponse } from "./models/IRegisterPersonServiceResponse";
import { verifyPasswordLength } from "@/utils/verifyPasswordLength";

export class RegisterPersonService {
    constructor(private personsRepository: IPersonsRepository) {}

    async execute(personData: IRegisterPersonServiceRequest): Promise<IRegisterPersonServiceResponse> {
        const hasExistPerson = await this.personsRepository.findPersonByEmail(personData.email);

        if (hasExistPerson) {
            throw new PersonAlreadyExistsError();
        }

        verifyPasswordLength(personData.password);

        const hashedPassword = await hash(personData.password, 6);
        personData.password = hashedPassword;

        const person = await this.personsRepository.registerPerson(personData);

        return { person }; 
    }
}
