import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdatePersonService } from "./update-person-service";

let personsRepository: IPersonsRepository;
let sut: UpdatePersonService;

describe('Should be able to update a person', () => {
    beforeEach(async () => {
        personsRepository = new InMemoryPersonRepository();
        sut = new UpdatePersonService(personsRepository);
    });

    it('Should be able to update a person', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: await hash('123456', 6),
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        const createdPerson = await personsRepository.registerPerson(personData);

        const personDataForUpdate = {
            name: 'Doe john',
            email: 'doejohn@gmail.com',
            password: await hash('123457', 6),
            latitude: -22.9482176,
            longitude: -47.0652211 
        }

        const personUpdated = await sut.execute(createdPerson.guid, personDataForUpdate);

        expect(personDataForUpdate.name).toEqual("Doe john");
    });
})