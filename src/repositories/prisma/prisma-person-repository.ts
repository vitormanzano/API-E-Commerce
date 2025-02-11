import { Prisma } from "@prisma/client";
import { IPersonsRepository } from "../persons-repository-interface";
import { prisma } from "../../lib/prisma";

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

        return person

    }
    async registerPerson(personData: Prisma.PersonCreateInput) {
        const person = await prisma.person.create({
            data: personData
        });
        
        return person;
    }
    
}