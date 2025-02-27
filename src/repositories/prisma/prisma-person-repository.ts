import { Person, Prisma } from "@prisma/client";
import { IPersonsRepository } from "../persons-repository-interface";
import { prisma } from "@/lib/prisma";
import { IFindNearbySeller } from "../models/IFindNearbySellers";

export class PrismaPersonRepository implements IPersonsRepository {
    async findPersonByGuid(guid: string) {
        const person = await prisma.person.findUnique({
            where: {
                guid
            }
        });

        return person;
    }

    async deletePersonByGuid(guid: string) {
        const person = await prisma.person.delete({
            where: {
                guid
            }
        });

        return person;
    }

    async findPersonByEmail(email: string) {
        const person = await prisma.person.findUnique({
            where: {
                email
            }
        });

        return person;
    }

    async findNearbySellers({ latitude, longitude }: IFindNearbySeller): Promise<Person[]> {
        const sellers = await prisma.$queryRaw<Person[]>`
            SELECT * FROM "Person"
            WHERE (6371 * acos (cos(radians(${latitude})) * cos( radians( latitude)) * cos( radians( longitude) - radians(${longitude})) + sin( radians(${latitude})) * sin( radians( latitude)))) <= 20 
            AND latitude <> ${latitude} AND longitude <> ${longitude} /* Where distance is fewer than 20km */
        `
        return sellers;
    }

    async registerPerson(personData: Prisma.PersonCreateInput) { 
        const person = await prisma.person.create({
            data: personData
        });
        
        return person;
    }

    async updatePersonByGuid(guid: string, personData: Prisma.PersonUpdateInput): Promise<Person | null> {
        const person = await prisma.person.update({
            where: {
                guid
            },
            data: {
                name: personData.name,
                email: personData.email,
                password: personData.password,
                latitude: personData.latitude,
                longitude: personData.longitude
            }
        });

        return person
    }
    
}