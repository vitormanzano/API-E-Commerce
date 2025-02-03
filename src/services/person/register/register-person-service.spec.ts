import { describe, it, beforeEach, expect } from "vitest";
import { IPersonsRepository } from "../../../repositories/persons-repository-interface";
import { RegisterPersonService } from "./register-person-service";
import { InMemoryPersonRepository } from "../../../repositories/in-memory/in-memory-person-repository";
import { randomUUID } from "crypto";
import { compare } from "bcryptjs";
import { PersonAlreadyExistsError } from "../../../errors/person-already-exists-error";
import { ZodError } from "zod";

let personsRepository: IPersonsRepository;
let sut: RegisterPersonService;

describe('Register person service', async () => {
    beforeEach(() => {
        personsRepository = new InMemoryPersonRepository();
        sut = new RegisterPersonService(personsRepository);
    });

    it('Should be able to register a person', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        const personResponse = await sut.execute(personData);

        expect(personResponse.person.email).toEqual(expect.any(String));
    });

    it('Should hash person password upon registration', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        const personResponse = await sut.execute(personData);


        const isPasswordCorrectlyHashed = await compare('123456', personResponse.person.password);

        expect(isPasswordCorrectlyHashed).toBe(true);

    });

    it('Should not be able to register with same email twice', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        await sut.execute(personData);

        await expect(() => sut.execute(personData)).rejects.toBeInstanceOf(PersonAlreadyExistsError);

    });

    it('Should not be able to register a user if password have less than 6 characters', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '12345',
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

    });

})