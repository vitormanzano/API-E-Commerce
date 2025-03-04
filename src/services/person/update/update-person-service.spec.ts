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

        const person = await personsRepository.registerPerson(personData);

        const fieldToUpdate = 'name';
        const valueToUpdate = 'Doe john updated'

        await sut.execute({
            personGuid: person.guid,
            fieldToUpdate,
            valueToUpdate
        });

        expect(person.name).toEqual(valueToUpdate);;
    });
})