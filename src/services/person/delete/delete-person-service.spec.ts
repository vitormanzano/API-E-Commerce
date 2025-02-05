import { describe, beforeEach, it, expect } from "vitest";
import { IPersonsRepository } from "../../../repositories/persons-repository-interface";
import { InMemoryPersonRepository } from "../../../repositories/in-memory/in-memory-person-repository";
import { randomUUID } from "crypto";
import { DeletePersonByGuidService } from "./delete-person-service";

let personsRepository: IPersonsRepository;
let sut: DeletePersonByGuidService;

describe('Delete person service', () => {
    beforeEach(async () => {
        personsRepository = new InMemoryPersonRepository();
        sut = new DeletePersonByGuidService(personsRepository);
    });

    it('Should be able to delete a person', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        const personResponse = await personsRepository.registerPerson(personData);

        const deletedPerson = await sut.execute(personResponse.guid);

        expect(deletedPerson.guid).toEqual(expect.any(String));

    });
})