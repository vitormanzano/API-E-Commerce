export class PersonAlreadyExistsError extends Error {
    constructor() {
        super('E-mail already exists.');
    }
}