import { Prisma, Person } from "@prisma/client";

export interface IUsersRepository {
    registerUser(user: Prisma.PersonCreateInput): Promise<Person>
}