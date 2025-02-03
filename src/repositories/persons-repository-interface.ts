import { Prisma, Person } from "@prisma/client";

export interface IPersonsRepository {
    registerPerson(person: Prisma.PersonCreateInput): Promise<Person>
    findPersonByEmail(email: string): Promise<Person>
}