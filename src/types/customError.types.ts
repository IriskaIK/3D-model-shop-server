export class NotFoundError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.status = 404;
    }
}

export class ValidationError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.status = 400;
    }
}

export class DatabaseError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.status = 500;
    }
}

export class AuthorizationError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.status = 401;
    }
}
