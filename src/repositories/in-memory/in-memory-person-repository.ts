import { Prisma, Person } from "@prisma/client";
import { IPersonsRepository } from "../persons-repository-interface";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { IFindNearbySeller } from "../models/IFindNearbySellers";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates";

export class InMemoryPersonRepository implements IPersonsRepository {
    private personList: Person[] = [];

    async updatePersonByGuid(personGuid: string, fieldToUpdate: string, valueToUpdate: any): Promise<Person | null> {
        const personData = await this.findPersonByGuid(personGuid);

        switch (fieldToUpdate) {
            case 'name':
                personData!.name = valueToUpdate as string;
                break;
            case 'email':
                personData!.email = valueToUpdate as string;
                break;
            case 'latitude':
                personData!.latitude = valueToUpdate as Decimal;
                break;
            case 'longitude':
                personData!.longitude = valueToUpdate as Decimal;
        }

        return personData;
    }
    
    public async deletePersonByGuid(guid: string): Promise<Person | undefined> {
        const hasExistPerson = await this.findPersonByGuid(guid);

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

       if (!hasExistPerson) {
            return null;
        }

        return hasExistPerson;
    }

    async findNearbySellers(params: IFindNearbySeller): Promise<Person[]> {
        const userIndex = this.personList.findIndex(person => person.guid === params.personGuid);

        let nearbySellersWithUser = this.personList.filter( person => {
            const distance = getDistanceBetweenCoordinates({
                latitude: params.latitude,
                longitude: params.longitude
            },
            {
                latitude: Number(person.latitude),
                longitude: Number(person.longitude),
            });

            return distance < 10;
        });

        nearbySellersWithUser.splice(userIndex, 1);

        return nearbySellersWithUser;
    }
}