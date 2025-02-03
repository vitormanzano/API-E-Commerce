import { Prisma, Person } from "@prisma/client";
import { IPersonsRepository } from "../persons-repository-interface";
import { randomUUID } from "crypto";

export class InMemoryPersonRepository implements IPersonsRepository {
    private personList: Person[] = [];

    async registerPerson(personData: Prisma.PersonCreateInput) {
        const person = {
            guid: randomUUID(),
            name: personData.name,
            email: personData.email,
            password: personData.password,
            latitude: personData.latitude,
            longitude: personData.longitude
        } as Person

        this.personList.push(person);

        return person;
    }
    async findPersonByEmail(email: string) {
        const hasExistPerson = this.personList.find(person => person.email === email);

        if (!hasExistPerson) {
            return null;
        }

        return hasExistPerson;
    }
    
}