import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { RegisterProductService } from "@/services/product/register/register-product-service";
import { beforeEach, describe, expect, it } from "vitest";
import { GetProfileService } from "./get-profile-service";
import { randomUUID } from "crypto";
import { hash } from "bcryptjs";

let personsRepository: IPersonsRepository;
let sut: GetProfileService;

describe('Register product service', () => {
    beforeEach(async () => {
        personsRepository = new InMemoryPersonRepository();
        sut = new GetProfileService(personsRepository);
    });

    it('Should be able to get person profile', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: await hash('123456', 6),
            latitude: -22.9482175,
            longitude: -47.0652211 
        } 

        const { guid } = await personsRepository.registerPerson(personData);

        const { person } = await sut.execute({guid});

        expect(person.guid).toEqual(expect.any(String));
    });

})