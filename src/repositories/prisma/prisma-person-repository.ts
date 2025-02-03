import { Prisma } from "@prisma/client";
import { IPersonsRepository } from "../persons-repository-interface";
import { prisma } from "../../lib/prisma";

export class PrismaPersonRepository implements IPersonsRepository {
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