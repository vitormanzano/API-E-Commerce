import { describe, expect, it, beforeEach } from "vitest";
import { IPersonsRepository } from "@/repositories/persons-repository-interface";
import { AuthenticatePersonService } from "./authenticate-service";
import { InMemoryPersonRepository } from "@/repositories/in-memory/in-memory-person-repository";
import { randomUUID } from "crypto";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";


let personsRepository: IPersonsRepository;
let sut: AuthenticatePersonService;

describe('Authenticate person service', () => {
    beforeEach(async () => {
        personsRepository = new InMemoryPersonRepository();
        sut = new AuthenticatePersonService(personsRepository);
    });

    it('Should be able to authenticate a person', async () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: await hash('123456', 6),
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        await personsRepository.registerPerson(personData);

        const authenticateData = {
            email: 'johndoe@gmail.com',
            password: '123456',
        }

        const { person } = await sut.execute(authenticateData);

        expect(person.guid).toEqual(expect.any(String));
    });

    it('SHould not be able to authenticate with wrong email', async  () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: await hash('123456', 6),
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        await personsRepository.registerPerson(personData);

        const authenticateData = {
            email: 'johndo@gmail.com',
            password: '123456',
        }
        
        await expect(() => sut.execute(authenticateData)).rejects.toBeInstanceOf(InvalidCredentialsError); 
    });

    it('SHould not be able to authenticate with wrong password', async  () => {
        const personData = {
            guid: randomUUID(),
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: await hash('123456', 6),
            latitude: -22.9482175,
            longitude: -47.0652211 
        }

        await personsRepository.registerPerson(personData);

        const authenticateData = {
            email: 'johndoe@gmail.com',
            password: '123457',
        }
        
        await expect(() => sut.execute(authenticateData)).rejects.toBeInstanceOf(InvalidCredentialsError); 
    });
});