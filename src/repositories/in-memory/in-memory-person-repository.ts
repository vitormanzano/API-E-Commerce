import { Prisma, Person } from "@prisma/client";
import { IPersonsRepository } from "../persons-repository-interface";
import { randomUUID } from "crypto";

export class InMemoryPersonRepository implements IPersonsRepository {
    private personList: Person[] = [];

    public async deletePersonByGuid(guid: string): Promise<Person | undefined> {
        const hasExistPerson = this.findPersonByGuid(guid);

        if (!hasExistPerson) {
            return undefined;
        }

        const indexOfPerson = this.personList.findIndex(person => person.guid === guid);

        if (indexOfPerson === -1) {
            return undefined;
        }

        this.personList.splice(indexOfPerson, 1);
        return hasExistPerson;
    }

    public async registerPerson(personData: Prisma.PersonCreateInput) {
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
    public async findPersonByEmail(email: string) {
        const hasExistPerson = this.personList.find(person => person.email === email);

        if (!hasExistPerson) {
            return null
        }

        return hasExistPerson;
    }

    public async findPersonByGuid(guid: string) {
        const hasExistPerson = this.personList.find(person => person.guid === guid);

        return hasExistPerson;
    }
    
}