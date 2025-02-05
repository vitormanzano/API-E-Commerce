import { Person, Prisma } from "@prisma/client";
import { IPersonsRepository } from "../persons-repository-interface";
import { prisma } from "../../lib/prisma";

export class PrismaPersonRepository implements IPersonsRepository {
    async deletePersonByGuid(guid: string): Promise<Person> {
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

        if(!person) {
            throw new Error();
        }

        return person

    }
    async registerPerson(personData: Prisma.PersonCreateInput) {
        const person = await prisma.person.create({
            data: personData
        });
        
        return person;
    }
    
}